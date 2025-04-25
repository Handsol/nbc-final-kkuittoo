import { fetchAddUserPoint } from '../services/user-points.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { UserPoint } from '@prisma/client';
import { POINTS_TO_ADD } from '@/constants/habits.constants';
import { useOptimisticMutation } from './useOptimisticMutation';
import {
  HabitsQueryResult,
  HabitWithPoints,
  PageParam,
} from '@/types/habits.type';
import { revalidateDashboard } from '../services/revalidate-dashboard.services';
import { InfiniteData } from '@tanstack/react-query';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */
export const useAddPointMutation = (userId: string) => {
  return useOptimisticMutation<
    UserPoint,
    string,
    InfiniteData<HabitsQueryResult, PageParam>
  >({
    queryKey: QUERY_KEYS.HABITS(userId),
    mutationFn: (habitId) => fetchAddUserPoint(habitId),
    onMutateOptimistic: (habitId, previousData) => {
      if (!previousData) {
        return {
          pages: [{ habits: [], totalHabits: 0, nextSkip: 0 }],
          pageParams: [{ skip: 0, take: 5 }],
        };
      }

      const tempPoint: UserPoint = {
        id: Date.now().toString(),
        userId,
        habitId,
        getTime: new Date(),
        points: POINTS_TO_ADD,
      };

      return {
        ...previousData,
        pages: previousData.pages.map((page) => ({
          ...page,
          habits: page.habits.map((habit) =>
            habit.id === habitId
              ? { ...habit, userPoints: [...habit.userPoints, tempPoint] }
              : habit,
          ),
        })),
      };
    },
    onSuccess: async (_data, _habitId, queryClient) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER_POINTS(userId),
      });
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.HABITS(userId) }); // 즉시 리페칭
      await revalidateDashboard();
    },
  });
};
