import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { HabitWithPoints } from '@/types/habits.type';
import { fetchGetAllHabits } from '../services/habit-client.services';
import { UserPoint } from '@prisma/client';
import { fetchGetAllUserPoints } from '../services/user-points.services';

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useHabitsQuery = (userId: string) => {
  return useQuery<{
    habits: HabitWithPoints[];
    userPoints: UserPoint[];
  }>({
    queryKey: QUERY_KEYS.HABITS(userId),
    queryFn: async () => {
      const habits = await fetchGetAllHabits();
      const userPoints = await fetchGetAllUserPoints(userId);
      return { habits, userPoints };
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
