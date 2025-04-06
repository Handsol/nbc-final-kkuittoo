import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import { fetchGetTeamTotalPoints } from '@/lib/services/team-actions.services';
import { TeamWithPoints } from '@/types/rank-users.type';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    // 모든 팀 데이터와 팀 멤버 정보 가져오기
    const teamList = await prisma.team.findMany({
      include: { teamMembers: true },
    });
    // 각 팀의 총 포인트와 멤버 수 계산
    const teamsWithPoints: TeamWithPoints[] = await Promise.all(
      teamList.map(async (team) => {
        // fetchGetTeamTotalPoints로 팀의 총 포인트 계산
        const { teamTotalPoints } = await fetchGetTeamTotalPoints(team.id);
        return {
          ...team, // 기존 팀 데이터
          totalPoints: teamTotalPoints, // 총 포인트
          memberCount: team.teamMembers.length, // 멤버 수
        };
      }),
    );

    return NextResponse.json(
      teamsWithPoints.sort((a, b) => b.totalPoints - a.totalPoints),
    );
  } catch (error) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
