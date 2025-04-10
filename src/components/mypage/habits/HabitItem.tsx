import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import {
  getCooldownStatus,
  getCurrentDayStatus,
} from '@/lib/utils/habit.utils';
import { ICONBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';
import { useHabitItemHandlers } from '@/lib/hooks/useHabitItemHandlers';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';

type HabitItemProps = {
  habit: Habit & { userPoints: UserPoint[] };
  userId: string;
};

const HabitItem = ({ habit, userId }: HabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    handleAddPoint,
    handleUpdateHabit,
    handleDeleteHabit,
    isAddPending,
    isUpdatePending,
    isDeletePending,
  } = useHabitItemHandlers({
    userId,
    habitId: habit.id,
    onEditToggle: setIsEditing,
  });

  const isValidDay = getCurrentDayStatus(habit);
  const isCooldownActive = getCooldownStatus(habit.userPoints);
  const isDisabled = !isValidDay || isCooldownActive || isAddPending;

  return (
    <div className="flex flex-col gap-2 relative">
      <article
        className={`flex items-center gap-4 p-4 border-b ${
          isAddPending || isUpdatePending || isDeletePending ? 'opacity-50' : ''
        }`}
      >
        <IconButton
          mode={ICONBUTTON_MODE.ADD}
          onClick={handleAddPoint}
          disabled={isDisabled}
        />

        <div className="flex-1 min-w-0">
          <Title
            mode={TITLE_MODE.LINK}
            className="font-semibold text-dark-gray truncate"
          >
            {habit.title}
          </Title>
          <Text className="text-sm text-medium-gray truncate">
            {habit.notes}
          </Text>
        </div>

        <div className="flex gap-2">
          <IconButton
            mode={ICONBUTTON_MODE.EDIT}
            onClick={() => setIsEditing(true)}
            disabled={isUpdatePending || isDeletePending}
          />
          <IconButton
            mode={ICONBUTTON_MODE.DELETE}
            onClick={handleDeleteHabit}
            disabled={isUpdatePending || isDeletePending}
          />
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
