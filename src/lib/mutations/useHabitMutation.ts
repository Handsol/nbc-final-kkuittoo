import {
  fetchCreateHabit,
  fetchDeleteHabit,
  fetchUpdateHabit,
} from '../services/habit-client.services';
import { Habit } from '@prisma/client';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { useOptimisticMutation } from './useOptimisticMutation';
import { HabitWithPoints } from '@/types/mypage.type';

/**
 * 새로운 Habit을 생성하는 mutation 훅 - 낙관적 업데이트(optimistic update)를 적용
 * @param {string} userId - 현재 로그인한 사용자의 ID
 * @returns {UseMutationResult}
 */
export const useCreateHabitMutation = (userId: string) => {
  return useOptimisticMutation<
    Habit,
    Omit<Habit, 'id' | 'userId' | 'createdAt' | 'userPoints'>,
    HabitWithPoints[]
  >({
    queryKey: QUERY_KEYS.HABITS(userId),
    mutationFn: (habit) => fetchCreateHabit(habit),
    onMutateOptimistic: (newHabit, previousData) => {
      if (!previousData) return [];

      const tempHabit: HabitWithPoints = {
        ...newHabit,
        id: Date.now().toString(),
        userId,
        createdAt: new Date().toISOString(),
        userPoints: [],
      };

      return [tempHabit, ...previousData];
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
  return useOptimisticMutation<
    Habit,
    Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
    HabitWithPoints[]
  >({
    queryKey: QUERY_KEYS.HABITS(userId),
    mutationFn: (updatedData) => fetchUpdateHabit(habitId, updatedData),
    onMutateOptimistic: (updatedData, previousData) => {
      if (!previousData) return [];

      return previousData.map((habit) =>
        habit.id === habitId ? { ...habit, ...updatedData } : habit,
      );
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
  return useOptimisticMutation<void, void, HabitWithPoints[]>({
    queryKey: QUERY_KEYS.HABITS(userId),
    mutationFn: () => fetchDeleteHabit(habitId),
    onMutateOptimistic: (_, previousData) => {
      if (!previousData) return [];

      return previousData.filter((habit) => habit.id !== habitId);
    },
  });
};
