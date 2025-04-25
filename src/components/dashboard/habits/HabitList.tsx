import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { HabitFormData, HabitWithPoints } from '@/types/habits.type';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import { useMemo, useState } from 'react';
import { sortHabitsByEnabled } from '@/lib/utils/habit-filter.utils';
import HabitEmptyState from './HabitEmptyState';
import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';

type HabitListProps = {
  userId: string;
  habits: HabitWithPoints[];
  isCreating: boolean;
  onToggleCreate: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

const HabitList = ({
  userId,
  habits,
  isCreating,
  onToggleCreate,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: HabitListProps) => {
  const createMutation = useCreateHabitMutation(userId);

  const handleCreateSuccess = (habitData: HabitFormData) => {
    createMutation.mutate(habitData, {
      onSuccess: () => {
        onToggleCreate();
      },
      onError: (error) => {
        console.error('습관 생성 실패:', error);
      },
    });
  };

  const sortedHabits = useMemo(() => sortHabitsByEnabled(habits), [habits]);

  return (
    <div className="my-[16px] overflow-y-auto">
      {isCreating ? (
        <div className="my-[8px] flex items-center justify-center">
          <HabitForm
            onCancel={onToggleCreate}
            onSuccess={handleCreateSuccess}
          />
        </div>
      ) : sortedHabits.length > 0 ? (
        <>
          <ul className="flex flex-col gap-[8px]">
            {sortedHabits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} userId={userId} />
            ))}
          </ul>
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mt-4 w-full py-2 text-center text-main hover:font-bold disabled:opacity-50"
            >
              {isFetchingNextPage ? '로딩 중...' : '더 보기'}
            </button>
          )}
        </>
      ) : (
        <HabitEmptyState onCreate={onToggleCreate} />
      )}
    </div>
  );
};

export default HabitList;
