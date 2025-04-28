import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { HabitFormData, HabitWithPoints } from '@/types/habits.type';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import HabitEmptyState from './HabitEmptyState';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import Text from '@/components/common/Text';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.contants';

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
    return (
      <div className="flex flex-col items-center justify-center h-full py-16">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={IMAGE_ASSETS.LOGO.DESKTOP}
            alt="Loading logo"
            width={120}
            height={90}
            className="animate-pulse"
          />
          <Text className="text-medium-gray">습관 목록을 불러오는 중...</Text>
          <div className="w-40 h-1.5 bg-light-gray rounded-full overflow-hidden">
            <div className="h-full bg-main animate-loading-bar" />
          </div>
        </div>
      </div>
    );
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
