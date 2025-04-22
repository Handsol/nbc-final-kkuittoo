'use server';

import { prisma } from '../prisma';
import { TeamWithPoints } from '@/types/rank.type';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { revalidatePath } from 'next/cache';

/**
 * 팀 데이터 가져오는 로직
 *
 * @param id {string} : teamId
 * @returns Promise<TeamData> : team 정보만
 */
export const fetchGetTeamData = async (id: string) => {
  try {
    const teamData = await prisma.team.findUnique({
      where: { id },
    });

    if (!teamData) throw new Error(TEAMS_MESSAGES.FETCH_FAILED);

    return teamData;
  } catch (error) {
    console.error('fetchGetTeamData 에러:', error);
    throw new Error(`${TEAMS_MESSAGES.FETCH_FAILED}, single team`);
  }
};

/**
 * 팀 멤버(해당팀에 가입한 멤버의 user정보, points) 데이터 가져오는 로직
 *
 * @param teamId {string} : teamId
 * @returns Promise<TeamMemberData[] & MemberDetailData[]> : 팀멤버별 유저정보 + 포인트
 */
export const fetchGetTeamMembers = async (teamId: string) => {
  try {
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

    if (!members) throw new Error(TEAMS_MESSAGES.FETCH_FAILED);

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
  } catch (error) {
    console.error('fetchGetTeamMembers 에러:', error);
    throw new Error(`${TEAMS_MESSAGES.FETCH_FAILED}, teamMember`);
  }
};

/**
 * 팀의 총 포인트를 구하는 로직
 *
 * @param id {string} : teamId
 * @returns Promise<number> : 팀멤버의 총 포인트
 */
export const fetchGetTeamTotalPoints = async (id: string) => {
  try {
    const teamData = await prisma.team.findUnique({
      where: { id },
    });

    if (!teamData) {
      throw new Error('팀 정보를 가져오는데 오류가 발생했습니다.');
    }

    const teamCreatedAt = teamData.createdAt;
    const teamMembersData = await fetchGetTeamMembers(teamData.id);

    // 팀 전체 포인트
    const teamTotalPoints = teamMembersData
      .flatMap(({ user: { userPoints } }) => userPoints)
      .filter(
        (point) =>
          point.getTime instanceof Date &&
          point.getTime.getTime() >= teamCreatedAt.getTime(),
      )
      .reduce(
        (totalPoint, currentPoint) => totalPoint + currentPoint.points,
        0,
      );

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
  } catch (error) {
    console.error('fetchGetTeamTotalPoints 에러:', error);
    throw new Error(`${TEAMS_MESSAGES.FETCH_FAILED}, teamPoints`);
  }
};

/**
 * 현재 유저의 팀 정보를 가져오는 로직
 *
 * @param userId {string}
 * @returns {Promise<TeamData & TeamMemberData> | null} : 팀 정보 + 팀 멤버 정보
 */
export const fetchGetMyTeamData = async (userId: string) => {
  try {
    const myTeamData = await prisma.teamMember.findFirst({
      where: { userId },
      include: { team: true },
    });

    if (!myTeamData) return null;

    return myTeamData;
  } catch (error) {
    console.error('fetchGetMyTeamData 에러:', error);
    throw new Error(`${TEAMS_MESSAGES.FETCH_FAILED}, user's Team`);
  }
};

/**
 * 현재 팀의 멤버 리스트 정보만 가져오는 로직
 *
 * @param teamId {string}
 * @returns
 */
export const fetchGetMyTeamMemberData = async (teamId: string) => {
  try {
    const myTeamMemberList = await prisma.teamMember.findMany({
      where: { teamId },
    });

    return myTeamMemberList;
  } catch (error) {
    console.error('fetchGetMyTeamMemberData 에러:', error);
    throw new Error(`${TEAMS_MESSAGES.FETCH_FAILED}, user's TeamMembers`);
  }
};

// 팀 전체 랭킹 리스트 (rank 포함)
export const fetchGetTeamsWithPoints = async () => {
  const teamList = await prisma.team.findMany({
    include: { teamMembers: true },
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

  const sorted = teamsWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);

  let prevPoints: number | null = null;
  let currentRank = 1;

  return sorted.map((team, index) => {
    if (team.totalPoints === prevPoints) {
      return { ...team, rank: currentRank };
    } else {
      currentRank = index + 1;
      prevPoints = team.totalPoints;
      return { ...team, rank: currentRank };
    }
  });
};

/**
 * 클라이언트 컴포넌트에서 호출 가능한 서버 액션
 * 사용자를 특정 팀에 가입시키는 서버 측 함수
 *
 * @param teamId 가입할 팀 ID
 * @param userId 가입할 사용자 ID
 * @returns 성공/실패 여부와 관련 메시지를 포함한 객체
 */
export const fetchJoinTeam = async (teamId: string, userId: string) => {
  try {
    // 기본 검증 - Prisma를 사용해 팀 데이터와 멤버 정보를 한 번에 조회
    // 여기서 Prisma는 서버에서만 실행되므로 DB 접근 정보가 외부로 노출되지 않음
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { teamMembers: true },
    });

    if (!team) throw new Error('팀을 찾을 수 없습니다.');
    if (team.teamMembers.some((m) => m.userId === userId)) {
      throw new Error('이미 팀 멤버입니다.');
    }
    if (team.teamMembers.length >= team.maxTeamSize) {
      throw new Error('팀 정원이 가득 찼습니다.');
    }

    // 팀 가입 처리 - Prisma를 통한 안전한 데이터베이스 작업 수행
    // 이 작업은 서버에서만 수행
    await prisma.teamMember.create({
      data: { userId, teamId, joinDate: new Date() },
    });

    // 캐시 갱신
    // 이 기능은 서버 액션에서만 사용 가능! 관련 페이지를 즉시 갱신!
    revalidatePath('/team');
    revalidatePath(`/team/${teamId}`);

    return { success: true, teamName: team.teamName };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '팀 가입 실패',
    };
  }
};
