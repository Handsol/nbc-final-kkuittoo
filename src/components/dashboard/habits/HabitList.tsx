import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { HabitFormData, HabitWithPoints } from '@/types/habits.type';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import HabitEmptyState from './HabitEmptyState';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import Text from '@/components/common/Text';
import { LoaderCircle } from 'lucide-react';
import HabitListLoading from './HabitListLoading';

type HabitListProps = {
  userId: string;
  habits: HabitWithPoints[];
  isCreating: boolean;
  onToggleCreate: () => void;
  fetchNextPage: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isInitialLoading: boolean;
};

const HabitList = ({
  userId,
  habits,
  isCreating,
  onToggleCreate,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  isInitialLoading,
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

  if (isInitialLoading) {
    return <HabitListLoading />;
  }

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
                {isFetchingNextPage ? (
                  <div className="flex items-center justify-center gap-[12px]">
                    <Text>더 불러오기...</Text>
                    <LoaderCircle className="animate-spin w-[24px] h-[24px]" />
                  </div>
                ) : (
                  '더 보기'
                )}
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
