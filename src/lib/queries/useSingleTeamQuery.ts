import { useQuery } from '@tanstack/react-query';
import { fetchGetSingleTeam } from '../services/team-client.services';

export const useSingleTeamQuery = (teamId: string) => {
  return useQuery({
    queryKey: ['team', teamId],
    queryFn: () => fetchGetSingleTeam(teamId),
  });
};
