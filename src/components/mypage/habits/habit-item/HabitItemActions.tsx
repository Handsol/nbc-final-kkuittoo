import IconButton from '@/components/common/button/IconButton';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';

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
}: HabitItemActionsProps) => (
  <nav className="flex gap-2" aria-label="Habit actions">
    <IconButton
      mode={ICONBUTTON_MODE.EDIT}
      onClick={onEdit}
      disabled={isEditDisabled}
      aria-label="Edit habit"
    />
    <IconButton
      mode={ICONBUTTON_MODE.DELETE}
      onClick={onDelete}
      disabled={isDeleteDisabled}
      aria-label="Delete habit"
    />
  </nav>
);

export default HabitItemActions;
