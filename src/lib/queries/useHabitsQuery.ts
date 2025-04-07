import { useQuery } from '@tanstack/react-query';
import { fetchGetAllHabits } from '@/lib/services/habit-actions.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useHabitsQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.HABITS(userId),
    queryFn: () => fetchGetAllHabits(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
