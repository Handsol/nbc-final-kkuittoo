import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import { useAddPointMutation } from '@/lib/mutations/useAddPointMutation';
import HabitForm from './HabitForm';
import {
  getCooldownStatus,
  getCurrentDayStatus,
} from '@/lib/utils/habit.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchDeleteHabit,
  fetchUpdateHabit,
} from '@/lib/services/habit-client.services';

type HabitItemProps = {
  habit: Habit & { userPoints: UserPoint[] };
  userId: string;
};

const HabitItem = ({ habit, userId }: HabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const addPointMutation = useAddPointMutation(userId);
  const queryClient = useQueryClient();

  // 수정
  const updateMutation = useMutation({
    mutationFn: (data: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>) =>
      fetchUpdateHabit(habit.id, data),
    onMutate: async (updatedData) => {
      await queryClient.cancelQueries({ queryKey: ['habits', userId] });

      const previousHabits = queryClient.getQueryData(['habits', userId]);

      // 옵티미스틱 업데이트
      queryClient.setQueryData(
        ['habits', userId],
        (old: (Habit & { userPoints: UserPoint[] })[]) => {
          return old.map((h) =>
            h.id === habit.id ? { ...h, ...updatedData } : h,
          );
        },
      );

      return { previousHabits };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(['habits', userId], context?.previousHabits);
      console.error('Habit 수정 실패:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', userId] });
      setIsEditing(false);
    },
  });

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: () => fetchDeleteHabit(habit.id),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['habits', userId] });

      const previousHabits = queryClient.getQueryData(['habits', userId]);

      // 옵티미스틱 업데이트
      queryClient.setQueryData(
        ['habits', userId],
        (old: (Habit & { userPoints: UserPoint[] })[]) => {
          return old.filter((h) => h.id !== habit.id);
        },
      );

      return { previousHabits };
    },
    onError: (err, _, context) => {
      queryClient.setQueryData(['habits', userId], context?.previousHabits);
      console.error('Habit 삭제 실패:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', userId] });
    },
  });

  const handleAddPoint = () => {
    addPointMutation.mutate(habit.id);
  };

  const handleUpdateHabit = (
    updatedHabit: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
  ) => {
    updateMutation.mutate(updatedHabit);
  };

  const handleDeleteHabit = () => {
    deleteMutation.mutate();
  };

  const isValidDay = getCurrentDayStatus(habit);
  const isCooldownActive = getCooldownStatus(habit.userPoints);
  const isDisabled =
    !isValidDay || isCooldownActive || addPointMutation.isPending;

  return (
    <div className="flex flex-col gap-2">
      <article className="flex items-center gap-4 p-4 border rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <button
          className={`w-9 h-9 font-extrabold rounded-full flex items-center justify-center text-lg transition-colors shrink-0 ${
            isDisabled
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={handleAddPoint}
          disabled={isDisabled || addPointMutation.isPending}
        >
          +
        </button>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-800 truncate">
            {habit.title}
          </h2>
          <p className="text-sm text-gray-600 truncate">{habit.notes}</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            className="w-9 h-9 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            onClick={() => setIsEditing(!isEditing)}
            disabled={updateMutation.isPending}
          >
            수정
          </button>
          <button
            className="w-9 h-9 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            onClick={handleDeleteHabit}
            disabled={deleteMutation.isPending}
          >
            삭제
          </button>
        </div>
      </article>

      {isEditing && (
        <HabitForm
          initialHabit={habit}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleUpdateHabit}
        />
      )}
    </div>
  );
};

export default HabitItem;
