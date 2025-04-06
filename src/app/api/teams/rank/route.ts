import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import { fetchGetTeamTotalPoints } from '@/lib/services/team-actions.services';
import { TeamWithPoints } from '@/types/rank-users.type';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const teamList = await prisma.team.findMany({
      include: { teamMembers: true },
    });

    const teamsWithPoints: TeamWithPoints[] = await Promise.all(
      teamList.map(async (team) => {
        const { teamTotalPoints } = await fetchGetTeamTotalPoints(team.id);
        return {
          ...team,
          totalPoints: teamTotalPoints,
          memberCount: team.teamMembers.length,
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
