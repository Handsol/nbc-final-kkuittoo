import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';
import { useHabitItemHandlers } from '@/lib/hooks/useHabitItemHandlers';
import HabitItemActions from './habit-item/HabitItemActions';
import HabitItemInfo from './habit-item/HabitItemInfo';
import HabitDaysBadge from './habit-item/HabitDaysBadge';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { POINT_DIALOG_CONTENTS } from '@/constants/dialog.constants';
import { useHabitItemState } from '@/lib/hooks/useHabitItemState';
import HabitCategoryBadge from './habit-item/HabitCategoryBadge';

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

  const { todayPoints, isDisabled, daysString } = useHabitItemState(
    habit,
    isAddPending,
  );

  const handleConfirmAddPoint = async () => {
    await handleAddPoint(todayPoints);
  };

  return (
    <div className="flex flex-col gap-[8px] relative">
      <li className="flex items-center gap-[16px] p-[16px] border-b">
        <ConfirmDialog
          contents={{
            ...POINT_DIALOG_CONTENTS,
            description: POINT_DIALOG_CONTENTS.description(daysString),
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
          <div className="flex items-baseline gap-[4px] flex-wrap mb-[2px]">
            <HabitCategoryBadge category={habit.categories} />
            <HabitDaysBadge habit={habit} />
          </div>
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
