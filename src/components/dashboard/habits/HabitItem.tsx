import { useMemo, useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import { isHabitDisabled } from '@/lib/utils/habit-filter.utils';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';
import { useHabitItemHandlers } from '@/lib/hooks/useHabitItemHandlers';
import HabitItemActions from './habit-item/HabitItemActions';
import HabitItemInfo from './habit-item/HabitItemInfo';
import { calculateTodayPoints } from '@/lib/utils/habit-points.utils';
import HabitDaysBadge from './HabitDaysBadge';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { POINT_DIALOG_CONTENTS } from '@/constants/dialog.constants';

type HabitItemProps = {
  habit: Habit & { userPoints: UserPoint[] };
  userId: string;
};

const HabitItem = ({ habit, userId }: HabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const todayPoints = useMemo(
    () => calculateTodayPoints(habit.userPoints),
    [habit.userPoints],
  );

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

  const getDaysString = () => {
    const days = [];
    if (habit.mon) days.push('월');
    if (habit.tue) days.push('화');
    if (habit.wed) days.push('수');
    if (habit.thu) days.push('목');
    if (habit.fri) days.push('금');
    if (habit.sat) days.push('토');
    if (habit.sun) days.push('일');
    return days.join(', ');
  };

  const handleConfirmAddPoint = async () => {
    await handleAddPoint(todayPoints);
  };

  return (
    <div className="flex flex-col gap-[8px] relative">
      <li className="flex items-center gap-[16px] p-[16px] border-b">
        <ConfirmDialog
          contents={{
            ...POINT_DIALOG_CONTENTS,
            description: POINT_DIALOG_CONTENTS.description(getDaysString()),
          }}
          onClick={handleConfirmAddPoint}
        >
          <IconButton
            mode={ICONBUTTON_MODE.POINT}
            disabled={isDisabled}
            aria-label="Add point"
          />
        </ConfirmDialog>

        <div className="flex-1 min-w-0">
          <HabitDaysBadge habit={habit} />
          <HabitItemInfo habit={habit} />
        </div>
        {!isEditing && (
          <HabitItemActions
            onEdit={() => setIsEditing(true)}
            onDelete={handleDeleteHabit}
            isEditDisabled={isUpdatePending || isDeletePending}
            isDeleteDisabled={isUpdatePending || isDeletePending}
          />
        )}
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
