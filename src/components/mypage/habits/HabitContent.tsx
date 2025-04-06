'use client';

import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import HabitList from './HabitList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCreateHabit } from '@/lib/services/habit-client.services';

type HabitContentProps = {
  habits: (Habit & { userPoints: UserPoint[] })[];
  userId: string;
};

const HabitContent = ({ habits, userId }: HabitContentProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: fetchCreateHabit,
    onMutate: async (newHabit) => {
      await queryClient.cancelQueries({ queryKey: ['habits', userId] });
      const previousHabits = queryClient.getQueryData(['habits', userId]);

      // 옵티미스틱 업데이트
      queryClient.setQueryData(
        ['habits', userId],
        (old: (Habit & { userPoints: UserPoint[] })[]) => {
          const tempId = Date.now().toString();
          return [
            {
              ...newHabit,
              id: tempId,
              userId: userId,
              createdAt: new Date().toISOString(),
              userPoints: [],
            },
            ...old,
          ];
        },
      );

      return { previousHabits };
    },
    onError: (err, newHabit, context) => {
      queryClient.setQueryData(['habits', userId], context?.previousHabits);
      console.error('Habit 생성 실패:', err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['habits', userId] });
      setIsCreating(false);
    },
  });

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return (
    <>
      {/* 메인 영역 */}
      <div className="flex-1 overflow-y-auto">
        {isCreating ? (
          //habit 생성
          <HabitForm
            onCancel={handleToggleCreate}
            onSuccess={(habitData) => createMutation.mutate(habitData)}
          />
        ) : habits.length > 0 ? (
          //habit 있을 때
          <HabitList habits={habits} userId={userId} />
        ) : (
          //habit 없을 때
          <div className="h-full flex items-center justify-center text-gray-500">
            등록된 habit이 없습니다.
          </div>
        )}
      </div>
      {/* 추가 버튼  */}
      <div className="mt-4 w-full">
        <button
          className="w-full py-2 bg-gray-700 text-white rounded-full"
          onClick={handleToggleCreate}
          disabled={createMutation.isPending}
        >
          Add Habit
        </button>
      </div>
    </>
  );
};

export default HabitContent;
