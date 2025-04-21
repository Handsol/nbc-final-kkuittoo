import IconButton from '@/components/common/button/IconButton';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { DELETE_DIALOG_CONTENTS } from '@/constants/dialog.constants';

type HabitItemActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  isEditDisabled: boolean;
  isDeleteDisabled: boolean;
};

const HabitItemActions = ({
  onEdit,
  onDelete,
  isEditDisabled,
  isDeleteDisabled,
}: HabitItemActionsProps) => {
  const handleDelete = async () => {
    try {
      await onDelete();
    } catch (error) {
      console.error('습관 삭제 실패', error);
    }
  };

  return (
    <nav className="flex gap-2" aria-label="Habit actions">
      <IconButton
        mode={ICONBUTTON_MODE.EDIT}
        onClick={onEdit}
        disabled={isEditDisabled}
        aria-label="Edit habit"
      />
      <ConfirmDialog contents={DELETE_DIALOG_CONTENTS} onClick={handleDelete}>
        <IconButton
          mode={ICONBUTTON_MODE.DELETE}
          disabled={isDeleteDisabled}
          aria-label="Delete habit"
        />
      </ConfirmDialog>
    </nav>
  );
};

export default HabitItemActions;
