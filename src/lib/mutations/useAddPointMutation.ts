import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAddUserPoint } from '../services/user-points.services';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { Habit, UserPoint } from '@prisma/client';
import { POINTS_TO_ADD } from '@/constants/habits.constants';

/**
 * 사용자 포인트 추가를 위한 React Query Mutation 훅
 * @param {string} userId - 포인트를 추가할 사용자의 ID
 * @returns
 */
export const useAddPointMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (habitId: string) => fetchAddUserPoint(habitId),
    // 서버 요청 전에 UI를 미리 업데이트
    onMutate: async (habitId) => {
      // 쿼리를 잠시 중단
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
      // 이전 데이터를 저장 - 왜냐? 에러 발생 시 되돌리기 위해
      const previousHabits = queryClient.getQueryData<
        (Habit & { userPoints: UserPoint[] })[]
      >(QUERY_KEYS.HABITS(userId));
      // 새 포인트를 임시로 추가
      queryClient.setQueryData<(Habit & { userPoints: UserPoint[] })[]>(
        QUERY_KEYS.HABITS(userId),
        (old) => {
          if (!old) return old;
          const tempId = Date.now().toString(); //임시 아이디 - 서버 저장 전 임시
          const tempPoint: UserPoint = {
            id: tempId,
            userId,
            habitId,
            getTime: new Date(),
            points: POINTS_TO_ADD,
          };
          return old.map((habit) =>
            habit.id === habitId
              ? { ...habit, userPoints: [...habit.userPoints, tempPoint] }
              : habit,
          );
        },
      );
      return { previousHabits };
    },
    // 에러 발생 시 되돌림
    onError: (err, _, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.HABITS(userId),
        context?.previousHabits,
      );
      console.error('포인트 추가 실패:', err);
    },
    // 성공/실패와 관계없이 쿼리 새로고침
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
  });
};
