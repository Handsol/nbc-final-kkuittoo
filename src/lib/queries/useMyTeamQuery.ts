import { useQuery } from '@tanstack/react-query';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';

export const useMyTeamQuery = (userId: string) => {
  return useQuery({
    queryKey: ['myTeam', userId],
    queryFn: () => fetchGetMyTeamData(userId),
    enabled: !!userId,
    refetchOnWindowFocus: true, // 창 포커스 시 자동 리패치
    staleTime: 1000 * 60 * 5, // 과도한 리패치 방지
  });
};
