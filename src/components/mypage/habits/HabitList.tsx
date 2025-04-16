import Text from '@/components/common/Text';
import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { HabitFormData, HabitWithPoints } from '@/types/habits.type';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import { useMemo } from 'react';
import { sortHabitsByEnabled } from '@/lib/utils/habit-filter.utils';

type HabitListProps = {
  userId: string;
  habits: HabitWithPoints[];
  isCreating: boolean;
  onToggleCreate: () => void;
};

const HabitList = ({
  habits,
  userId,
  isCreating,
  onToggleCreate,
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

  // 쿨다운 없음, 오늘 수행 가능 -> 위쪽에 정렬
  const sortedHabits = useMemo(() => sortHabitsByEnabled(habits), [habits]);

  return (
    <ul className="h-[460px] overflow-y-auto">
      {isCreating ? (
        <li className="my-[8px] flex items-center justify-center">
          <HabitForm
            onCancel={onToggleCreate}
            onSuccess={handleCreateSuccess}
          />
        </li>
      ) : sortedHabits.length > 0 ? (
        <div className="flex flex-col gap-[8px]">
          {sortedHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} userId={userId} />
          ))}
        </div>
      ) : (
        <li>
          <Text>등록된 habit이 없습니다.</Text>
        </li>
      )}
    </ul>
  );
};
export default HabitList;
