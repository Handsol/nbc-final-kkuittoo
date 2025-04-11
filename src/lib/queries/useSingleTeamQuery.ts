import { useQuery } from '@tanstack/react-query';
import { fetchGetSingleTeam } from '../services/team-client.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

export const useSingleTeamQuery = (teamId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.SINGLE_TEAM(teamId),
    queryFn: () => fetchGetSingleTeam(teamId),
  });
};
