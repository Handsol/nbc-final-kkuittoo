import {
  fetchCreateHabit,
  fetchDeleteHabit,
  fetchUpdateHabit,
} from '../services/habit-client.services';
import { Habit } from '@prisma/client';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * 새로운 Habit을 생성하는 mutation 훅
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @returns {UseMutationResult}
 */
export const useCreateHabitMutation = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    Habit,
    Error,
    Omit<Habit, 'id' | 'userId' | 'createdAt' | 'userPoints'>
  >({
    mutationFn: (habit) => fetchCreateHabit(habit),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
  });
};

/**
 * 기존의 습관(Habit)을 수정하는 mutation 훅
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @param {string} habitId - 수정할 습관의 ID
 * @returns {UseMutationResult}
 */

export const useUpdateHabitMutation = (userId: string, habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    Habit,
    Error,
    Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>
  >({
    mutationFn: (updatedData) => fetchUpdateHabit(habitId, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
    onError: (error) => {
      console.error('습관 수정 실패:', error);
    },
  });
};

/**
 * 습관(Habit)을 삭제하는 mutation 훅
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @param {string} habitId - 삭제할 습관의 ID
 * @returns {UseMutationResult}
 */

export const useDeleteHabitMutation = (userId: string, habitId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => fetchDeleteHabit(habitId),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.HABITS(userId) });
    },
  });
};
