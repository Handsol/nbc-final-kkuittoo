'use server';

import { TeamData, TeamMemberData } from '@/types/teams.type';
import { prisma } from '../prisma';
import { TeamWithPoints } from '@/types/rank.type';

/**
 * 팀 데이터 가져오는 로직
 *
 * @param id {string} : teamId
 * @returns Promise<TeamData> : team 정보만
 */
export const fetchTeamData = async (id: string) => {
  return await prisma.team.findUnique({
    where: { id },
  });
};

/**
 * 팀 멤버(해당팀에 가입한 멤버의 user정보, points) 데이터 가져오는 로직
 *
 * @param teamId {string} : teamId
 * @returns Promise<TeamMemberData[] & MemberDetailData[]> : 팀멤버별 유저정보 + 포인트
 */
export const fetchTeamMembers = async (teamId: string) => {
  const members = await prisma.teamMember.findMany({
    where: { teamId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          bio: true,
          image: true,
          userPoints: {
            select: {
              points: true,
              getTime: true,
            },
          },
        },
      },
    },
  });

  return members
    .map((member) => {
      const totalPoints = member.user.userPoints.reduce(
        (sum, pointLog) => sum + pointLog.points,
        0,
      );

      const filteredPoints = member.user.userPoints.filter(
        (point) => point.getTime >= member.joinDate,
      );
      const totalContribution = filteredPoints.reduce(
        (sum, point) => sum + point.points,
        0,
      );

      return {
        ...member,
        user: {
          ...member.user,
          userPoints: filteredPoints.sort(
            (a, b) => a.getTime.getTime() - b.getTime.getTime(),
          ),
        },
        totalPoints,
        totalContribution,
      };
    })
    .sort((a, b) => b.totalContribution - a.totalContribution);
};

/**
 * 팀의 총 포인트를 구하는 로직
 *
 * @param id {string} : teamId
 * @returns Promise<number> : 팀멤버의 총 포인트
 */
export const fetchGetTeamTotalPoints = async (id: string) => {
  const teamData = await prisma.team.findUnique({
    where: { id },
  });

  if (!teamData) {
    throw new Error('팀 정보를 가져오는데 오류가 발생했습니다.');
  }

  const teamCreatedAt = teamData.createdAt;
  const teamMembersData = await fetchTeamMembers(teamData.id);

  // 팀 전체 포인트
  const teamTotalPoints = teamMembersData
    .flatMap(({ user: { userPoints } }) => userPoints)
    .filter(
      (point) =>
        point.getTime instanceof Date &&
        point.getTime.getTime() >= teamCreatedAt.getTime(),
    )
    .reduce((totalPoint, currentPoint) => totalPoint + currentPoint.points, 0);

  // 팀 가입 이후의 멤버들 포인트
  const teamMembersPoints = teamMembersData.flatMap(({ user }) => ({
    userId: user.id,
    userPoint: user.userPoints.filter(
      (point) =>
        point.getTime instanceof Date &&
        point.getTime.getTime() >= teamCreatedAt.getTime(),
    ),
  }));

  return { teamTotalPoints, teamMembersPoints };
};

/**
 * 팀 전체 포인트에 맞는 퀘스트를 가져오는 로직
 *
 * @param teamTotalPoint {number}
 * @returns Promise<TeamQuest> : 현재 팀퀘스트의 데이터
 */
export const fetchGetCurrentTeamQuest = async (teamTotalPoints: number) => {
  const teamQuestList = await prisma.teamQuest.findMany({
    orderBy: { id: 'asc' },
  });

  return teamQuestList.find((quest) => quest.requiredPoints > teamTotalPoints);
};

/**
 * 현재 유저의 팀 정보를 가져오는 로직
 *
 * @param userId {string}
 * @returns {Promise<TeamData & TeamMemberData> | null} : 팀 정보 + 팀 멤버 정보
 */
export const fetchGetMyTeamData = async (userId: string) => {
  const myTeamData = await prisma.teamMember.findFirst({
    where: { userId },
    include: { team: true },
  });

  if (!myTeamData) return null;

  return myTeamData;
};

/**
 * 현재 팀의 멤버 리스트 정보만 가져오는 로직
 *
 * @param teamId {string}
 * @returns
 */
export const fetchGetMyTeamMemberData = async (teamId: string) => {
  const myTeamMemberList = await prisma.teamMember.findMany({
    where: { teamId },
  });

  return myTeamMemberList;
};

export const fetchGetTeamsWithPoints = async (): Promise<TeamWithPoints[]> => {
  const teamList = await prisma.team.findMany({
    include: {
      teamMembers: true,
    },
  });

  const teamsWithPoints = await Promise.all(
    teamList.map(async (team) => {
      const { teamTotalPoints } = await fetchGetTeamTotalPoints(team.id);
      return {
        ...team,
        totalPoints: teamTotalPoints,
        memberCount: team.teamMembers.length,
      };
    }),
  );

  return teamsWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);
};
