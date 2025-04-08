'use client';

import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import HabitList from './HabitList';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import Text from '@/components/common/Text';

type HabitContentProps = {
  habits: (Habit & { userPoints: UserPoint[] })[];
  userId: string;
};

const HabitContent = ({ habits, userId }: HabitContentProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const createMutation = useCreateHabitMutation(userId);

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
          <Text>등록된 habit이 없습니다.</Text>
        )}
      </div>

      <div className="mt-4 w-full">
        <ActionButton
          mode={ACTIONBUTTON_MODE.FULL}
          onClick={handleToggleCreate}
          disabled={createMutation.isPending}
        >
          Add Habit
        </ActionButton>
      </div>
    </>
  );
};

export default HabitContent;
