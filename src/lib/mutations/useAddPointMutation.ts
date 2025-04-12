import { fetchAddUserPoint } from '../services/user-points.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { UserPoint } from '@prisma/client';
import { POINTS_TO_ADD } from '@/constants/habits.constants';
import { useOptimisticMutation } from './useOptimisticMutation';
import { HabitWithPoints } from '@/types/habits.type';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */

export const useAddPointMutation = (userId: string) => {
  return useOptimisticMutation<
    { habits: HabitWithPoints[]; userPoints: UserPoint[] },
    string
  >({
    queryKey: QUERY_KEYS.HABITS(userId),
    mutationFn: (habitId) => fetchAddUserPoint(habitId),
    onMutateOptimistic: (habitId, previousData) => {
      if (!previousData) return { habits: [], userPoints: [] };

      const tempPoint: UserPoint = {
        id: Date.now().toString(),
        userId,
        habitId,
        getTime: new Date(),
        points: POINTS_TO_ADD,
      };

      const updatedHabits = previousData.habits.map((habit) =>
        habit.id === habitId
          ? { ...habit, userPoints: [...habit.userPoints, tempPoint] }
          : habit,
      );

      return {
        habits: updatedHabits,
        userPoints: [...previousData.userPoints, tempPoint],
      };
    },

    onSuccess: (data, habitId, queryClient) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SINGLE_USER(userId),
      });
    },
  });
};
