import { useQuery } from '@tanstack/react-query';
import { fetchGetSingleTeam } from '../services/team-client.services';
import { QUERY_KEY } from '@/constants/query-key.constants';

export const useSingleTeamQuery = (teamId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.SINGLE_TEAM, teamId],
    queryFn: () => fetchGetSingleTeam(teamId),
  });
};
