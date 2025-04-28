import { fetchAddUserPoint } from '../services/user-points.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { UserPoint } from '@prisma/client';
import { POINTS_TO_ADD } from '@/constants/habits.constants';
import { HabitsQueryResult, PageParam } from '@/types/habits.type';
import { revalidateDashboard } from '../services/revalidate-dashboard.services';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */
export const useAddPointMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    UserPoint,
    Error,
    string,
    { previousData?: InfiniteData<HabitsQueryResult, PageParam> }
  >({
    mutationFn: (habitId) => fetchAddUserPoint(habitId),

    onMutate: async (habitId) => {
      // 모든 관련 쿼리 키에 대한 쿼리 중단
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.BASE_HABITS(userId),
        exact: false,
      });

      // 이전 데이터 저장
      const previousData = queryClient.getQueryData<
        InfiniteData<HabitsQueryResult, PageParam>
      >(QUERY_KEYS.BASE_HABITS(userId));

      // 모든 관련 쿼리 데이터 업데이트
      const tempPoint: UserPoint = {
        id: Date.now().toString(),
        userId,
        habitId,
        getTime: new Date(),
        points: POINTS_TO_ADD,
      };

      // 모든 관련 쿼리 키 패턴에 대해 업데이트
      queryClient.setQueriesData<InfiniteData<HabitsQueryResult, PageParam>>(
        { queryKey: QUERY_KEYS.BASE_HABITS(userId), exact: false },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              habits: page.habits.map((habit) =>
                habit.id === habitId
                  ? { ...habit, userPoints: [...habit.userPoints, tempPoint] }
                  : habit,
              ),
            })),
          };
        },
      );

      return { previousData };
    },

    onError: (_error, _habitId, context) => {
      if (context?.previousData) {
        queryClient.setQueriesData(
          { queryKey: QUERY_KEYS.BASE_HABITS(userId), exact: false },
          context.previousData,
        );
      }
    },

    onSettled: async () => {
      // 모든 관련 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.BASE_HABITS(userId),
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.USER_POINTS(userId),
      });
      await revalidateDashboard();
    },
  });
};
