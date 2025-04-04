'use server';

import { prisma } from '../prisma';

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
  return await prisma.teamMember.findMany({
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
