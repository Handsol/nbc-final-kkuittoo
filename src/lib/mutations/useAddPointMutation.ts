import { fetchAddUserPoint } from '../services/user-points.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { UserPoint } from '@prisma/client';
import { POINTS_TO_ADD } from '@/constants/habits.constants';
import { useOptimisticMutation } from './useOptimisticMutation';
import { HabitWithPoints } from '@/types/habits.type';
import { revalidateMyPage } from '../services/revalidate-mypage.services';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */
export const useAddPointMutation = (userId: string) => {
  return useOptimisticMutation<UserPoint, string, HabitWithPoints[]>({
    queryKey: QUERY_KEYS.HABITS(userId),
    mutationFn: (habitId) => fetchAddUserPoint(habitId),
    onMutateOptimistic: (habitId, previousData) => {
      if (!previousData) return [];

      const tempPoint: UserPoint = {
        id: Date.now().toString(),
        userId,
        habitId,
        getTime: new Date(),
        points: POINTS_TO_ADD,
      };

      return previousData.map((habit) =>
        habit.id === habitId
          ? { ...habit, userPoints: [...habit.userPoints, tempPoint] }
          : habit,
      );
    },
    onSuccess: async (_data, _habitId, queryClient) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER_POINTS(userId),
      });
      await revalidateMyPage();
    },
  });
};
