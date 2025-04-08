import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import {
  getCooldownStatus,
  getCurrentDayStatus,
} from '@/lib/utils/habit.utils';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';
import { useHabitItemHandlers } from '@/lib/hooks/useHabitItemHandlers';

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
      {(isAddPending || isUpdatePending || isDeletePending) && (
        <div className="absolute inset-0 bg-white bg-opacity-50 rounded-3xl z-10" />
      )}

      <article
        className={`flex items-center gap-4 p-4 border rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow ${
          isAddPending ? 'opacity-70' : ''
        }`}
      >
        <IconButton
          mode={ICONBUTTON_MODE.ADD}
          onClick={handleAddPoint}
          disabled={isDisabled}
        />

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-800 truncate">
            {habit.title}
          </h2>
          <p className="text-sm text-gray-600 truncate">{habit.notes}</p>
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
