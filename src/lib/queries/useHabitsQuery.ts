import { useQuery } from '@tanstack/react-query';
import { fetchGetAllHabits } from '@/lib/services/habit-actions.services';

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useHabitsQuery = (userId: string) => {
  return useQuery({
    queryKey: ['habits', userId],
    queryFn: () => fetchGetAllHabits(userId),
    enabled: !!userId,
  });
};
