import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import { isHabitDisabled } from '@/lib/utils/habit.utils';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';
import { useHabitItemHandlers } from '@/lib/hooks/useHabitItemHandlers';
import HabitItemActions from './habit-item/HabitItemActions';
import HabitItemInfo from './habit-item/HabitItemInfo';

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
  const isDisabled = isHabitDisabled(habit, isAddPending);
  const isPending = isAddPending || isUpdatePending || isDeletePending;

  return (
    <div className="flex flex-col gap-2 relative">
      <li
        className={`flex items-center gap-4 p-4 border-b ${
          isPending ? 'opacity-50' : ''
        }`}
      >
        <IconButton
          mode={ICONBUTTON_MODE.ADD}
          onClick={handleAddPoint}
          disabled={isDisabled}
        />

        <HabitItemInfo habit={habit} />
        <HabitItemActions
          onEdit={() => setIsEditing(true)}
          onDelete={handleDeleteHabit}
          isEditDisabled={isUpdatePending || isDeletePending}
          isDeleteDisabled={isUpdatePending || isDeletePending}
        />
      </li>

      {isEditing && (
        <div className="h-full flex items-center justify-center">
          <HabitForm
            initialHabit={habit}
            onCancel={() => setIsEditing(false)}
            onSuccess={handleUpdateHabit}
          />
        </div>
      )}
    </div>
  );
};

export default HabitItem;
