import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { HabitFormData, HabitWithPoints } from '@/types/habits.type';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import { useMemo } from 'react';
import { sortHabitsByEnabled } from '@/lib/utils/habit-filter.utils';
import HabitEmptyState from './HabitEmptyState';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import Text from '@/components/common/Text';

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

  return (
    <div className="my-[16px] overflow-y-auto">
      {isCreating ? (
        <div className="my-[8px] flex items-center justify-center">
          <HabitForm
            onCancel={onToggleCreate}
            onSuccess={handleCreateSuccess}
          />
        </div>
      ) : habits.length > 0 ? (
        <>
          <ul className="flex flex-col gap-[8px]">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} userId={userId} />
            ))}
          </ul>
          <div className="mt-4 flex w-full flex-col items-center justify-center">
            {hasNextPage ? (
              <ActionButton
                mode={ACTIONBUTTON_MODE.ROUNDED_MD_LIGHT_GRAY}
                onClick={fetchNextPage}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
              </ActionButton>
            ) : (
              <Text className="text-sm text-medium-gray">
                마지막 습관까지 다 봤어요!
              </Text>
            )}
          </div>
        </>
      ) : (
        <HabitEmptyState onCreate={onToggleCreate} />
      )}
    </div>
  );
};

export default HabitList;
