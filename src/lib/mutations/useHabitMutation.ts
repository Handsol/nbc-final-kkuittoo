import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchCreateHabit,
  fetchDeleteHabit,
  fetchUpdateHabit,
} from '../services/habit-client.services';
import { Habit, UserPoint } from '@prisma/client';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

/**
 * 새로운 Habit을 생성하는 mutation 훅 - 낙관적 업데이트(optimistic update)를 적용
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @returns {UseMutationResult}
 */
export const useCreateHabitMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    //여기있는 주석들은 옵티미스틱 업데이트가 헷갈려서 달은 것으로 나중에 삭제할 예정
    // 실제 서버로 data 보냄
    mutationFn: fetchCreateHabit,
    // mutation 요청 직전에 실행
    onMutate: async (newHabit) => {
      // 해당 유저의 habit 목록 쿼리를 잠시 중단
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
      // 이전 데이터를 저장 - 왜냐? 에러 발생 시 되돌리기 위해
      const previousHabits = queryClient.getQueryData(
        QUERY_KEYS.HABITS(userId),
      );
      // 캐시에 낙관적 데이터 추가 - 임시로!
      queryClient.setQueryData(
        QUERY_KEYS.HABITS(userId),
        (old: (Habit & { userPoints: UserPoint[] })[]) => {
          const tempId = Date.now().toString(); //임시 아이디 - 서버 저장 전 임시
          return [
            {
              ...newHabit,
              id: tempId,
              userId,
              createdAt: new Date().toISOString(),
              userPoints: [],
            },
            ...old,
          ];
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
      console.error('Habit 생성 실패:', err);
    },
    // 성공/실패와 관계없이 쿼리 새로고침
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
  });
};

/**
 * 기존의 습관(Habit)을 수정하는 mutation 훅 - 낙관적 업데이트(optimistic update)를 적용
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @param {string} habitId - 수정할 습관의 ID
 * @returns {UseMutationResult}
 */
export const useUpdateHabitMutation = (userId: string, habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>) =>
      fetchUpdateHabit(habitId, data),
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
      const previousHabits = queryClient.getQueryData(
        QUERY_KEYS.HABITS(userId),
      );

      queryClient.setQueryData(
        QUERY_KEYS.HABITS(userId),
        (old: (Habit & { userPoints: UserPoint[] })[]) =>
          old.map((h) => (h.id === habitId ? { ...h, ...updatedData } : h)),
      );

      return { previousHabits };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.HABITS(userId),
        context?.previousHabits,
      );
      console.error('Habit 수정 실패:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
  });
};

/**
 * 습관(Habit)을 삭제하는 mutation 훅 - 낙관적 업데이트(optimistic update)를 적용
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @param {string} habitId - 삭제할 습관의 ID
 * @returns {UseMutationResult}
 */
export const useDeleteHabitMutation = (userId: string, habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => fetchDeleteHabit(habitId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
      const previousHabits = queryClient.getQueryData(
        QUERY_KEYS.HABITS(userId),
      );

      // 캐시에서 해당 habit 즉시 제거
      queryClient.setQueryData(
        QUERY_KEYS.HABITS(userId),
        (old: (Habit & { userPoints: UserPoint[] })[]) =>
          old.filter((h) => h.id !== habitId),
      );

      return { previousHabits };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(
        QUERY_KEYS.HABITS(userId),
        context?.previousHabits,
      );
      console.error('Habit 삭제 실패:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
  });
};
