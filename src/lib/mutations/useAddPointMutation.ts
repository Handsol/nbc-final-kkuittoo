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
    // 실제 API 요청 함수
    mutationFn: (habitId) => fetchAddUserPoint(habitId),

    // mutation 호출 직전에 실행 (낙관적 업데이트)
    onMutate: async (habitId) => {
      // 해당 queryKey에 대한 쿼리 중단
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.HABITS(userId) });

      // 이전 캐시 데이터 가져오기
      const previousData = queryClient.getQueryData<
        InfiniteData<HabitsQueryResult, PageParam>
      >(QUERY_KEYS.HABITS(userId));

      // 낙관적 업데이트된 값으로 캐시 업데이트
      const tempPoint: UserPoint = {
        id: Date.now().toString(),
        userId,
        habitId,
        getTime: new Date(), // Date 객체로 설정 (TypeScript 에러 방지)
        points: POINTS_TO_ADD,
      };

      queryClient.setQueryData<InfiniteData<HabitsQueryResult, PageParam>>(
        QUERY_KEYS.HABITS(userId),
        (oldData) => {
          if (!oldData) {
            return {
              pages: [{ habits: [], totalHabits: 0, nextSkip: 0 }],
              pageParams: [{ skip: 0, take: 5 }],
            };
          }

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

      // 실패 시 복원할 수 있도록 이전 데이터 반환
      return { previousData };
    },

    // API 요청 실패 시 실행
    onError: (_error, _habitId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          QUERY_KEYS.HABITS(userId),
          context.previousData,
        );
      }
    },

    // 요청 성공/실패 후 실행
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },

    // API 요청 성공 시 실행
    onSuccess: async (data, habitId) => {
      // 캐시 무효화 및 리페칭
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.HABITS(userId),
          refetchType: 'all',
        }),
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.USER_POINTS(userId),
          refetchType: 'all',
        }),
      ]);
      await Promise.all([
        queryClient.refetchQueries({
          queryKey: QUERY_KEYS.HABITS(userId),
          type: 'all',
        }),
        queryClient.refetchQueries({
          queryKey: QUERY_KEYS.USER_POINTS(userId),
          type: 'all',
        }),
      ]);

      // 캐시 수동 갱신 (최신 UserPoint 데이터 반영)
      queryClient.setQueryData<InfiniteData<HabitsQueryResult, PageParam>>(
        QUERY_KEYS.HABITS(userId),
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              habits: page.habits.map((habit) =>
                habit.id === habitId
                  ? { ...habit, userPoints: [...habit.userPoints, data] }
                  : habit,
              ),
            })),
          };
        },
      );

      await revalidateDashboard();
    },
  });
};
