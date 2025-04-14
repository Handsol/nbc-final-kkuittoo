'use server';

import { prisma } from '@/lib/prisma';
import { TeamWithPoints } from '@/types/rank.type';
import { UserData } from '@/types/rank.type';
import { fetchGetTeamTotalPoints } from './team-actions.services';

export const searchTeams = async (
  searchTerm: string,
): Promise<TeamWithPoints[]> => {
  const teams = await prisma.team.findMany({
    where: searchTerm
      ? {
          teamName: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }
      : {},
    include: { teamMembers: true },
  });

  return Promise.all(
    teams.map(async (team) => {
      const { teamTotalPoints } = await fetchGetTeamTotalPoints(team.id);
      return {
        ...team,
        totalPoints: teamTotalPoints,
        memberCount: team.teamMembers.length,
      };
    }),
  ).then((teams) => teams.sort((a, b) => b.totalPoints - a.totalPoints));
};

export const searchUsers = async (searchTerm: string): Promise<UserData[]> => {
  const users = await prisma.user.findMany({
    where: searchTerm
      ? {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        }
      : {},
    include: { userPoints: true },
  });

  return users
    .map((user) => ({
      ...user,
      totalPoints: user.userPoints.reduce(
        (sum, point) => sum + point.points,
        0,
      ),
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);
};
