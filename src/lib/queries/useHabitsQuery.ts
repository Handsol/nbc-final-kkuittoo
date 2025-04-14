import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { HabitWithPoints } from '@/types/habits.type';
import { fetchGetAllHabits } from '../services/habit-client.services';
import { STALE_TIME } from '@/constants/time.constants';

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useHabitsQuery = (userId: string) => {
  return useQuery<HabitWithPoints[]>({
    queryKey: QUERY_KEYS.HABITS(userId),
    queryFn: () => fetchGetAllHabits(),
    enabled: !!userId,
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
};
