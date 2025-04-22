import { useQuery } from '@tanstack/react-query';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';

export const useMyTeamQuery = (userId: string) => {
  return useQuery({
    queryKey: ['myTeam', userId],
    queryFn: () => fetchGetMyTeamData(userId),
    enabled: !!userId,
  });
};
