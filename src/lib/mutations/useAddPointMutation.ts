import { fetchAddUserPoint } from '../services/user-points.services';
import { UserPoint } from '@prisma/client';
import { POINTS_TO_ADD } from '@/constants/habits.constants';
import {
  HabitsQueryResult,
  MutationContext,
  PageParam,
} from '@/types/habits.type';
import { revalidateDashboard } from '../services/revalidate-dashboard.services';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getHabitQueryKeys,
  optimisticUpdate,
} from '../utils/habit-points.utils';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */
export const useAddPointMutation = (userId: string) => {
  const queryClient = useQueryClient();
  const queryKeys = getHabitQueryKeys(userId);

  return useMutation<UserPoint, Error, string, MutationContext>({
    mutationFn: fetchAddUserPoint,

    onMutate: async (habitId) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.base,
        exact: false,
      });

      const previousData = queryClient.getQueryData<
        InfiniteData<HabitsQueryResult, PageParam>
      >(queryKeys.base);

      const tempPoint: UserPoint = {
        id: Date.now().toString(),
        userId,
        habitId,
        getTime: new Date(),
        points: POINTS_TO_ADD,
      };

      queryClient.setQueriesData<InfiniteData<HabitsQueryResult, PageParam>>(
        { queryKey: queryKeys.base, exact: false },
        (oldData) => optimisticUpdate(oldData, habitId, tempPoint),
      );

      return { previousData };
    },

    onError: (error, habitId, context) => {
      if (context?.previousData) {
        queryClient.setQueriesData(
          { queryKey: queryKeys.base, exact: true },
          context.previousData,
        );
      }
    },

    onSettled: async (data, error, habitId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...queryKeys.base, habitId],
          exact: false,
        }),
        queryClient.invalidateQueries({
          queryKey: queryKeys.userPoints,
        }),
        revalidateDashboard(),
      ]);
    },
  });
};
