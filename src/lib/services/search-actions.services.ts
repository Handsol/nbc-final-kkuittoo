// 유저 검색 (전체 rank 유지)
import { fetchAllUsersWithTotalPoints } from './user-actions.services';

export const searchUsers = async (searchTerm: string) => {
  const allUsers = await fetchAllUsersWithTotalPoints();
  if (!searchTerm) return allUsers;
  return allUsers.filter((user) =>
    (user.name ?? '').toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

// 팀 검색 (전체 rank 유지)
import { fetchGetTeamsWithPoints } from './team-actions.services';

export const searchTeams = async (searchTerm: string) => {
  const allTeams = await fetchGetTeamsWithPoints();
  if (!searchTerm) return allTeams;
  return allTeams.filter((team) =>
    team.teamName.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};
