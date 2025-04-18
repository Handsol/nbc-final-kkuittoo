import IconButton from '@/components/common/button/IconButton';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import ConfirmDialog from '@/components/common/ConfirmDialog';

type HabitItemActionsProps = {
  onEdit: () => void;
  onDelete: () => void;
  isEditDisabled: boolean;
  isDeleteDisabled: boolean;
  isEditingDisabled: boolean;
};

const HabitItemActions = ({
  onEdit,
  onDelete,
  isEditDisabled,
  isDeleteDisabled,
  isEditingDisabled,
}: HabitItemActionsProps) => {
  const deleteContents = {
    uiButtonText: 'Delete',
    title: '습관 삭제',
    description:
      '이 습관을 정말 삭제하시겠습니까? 삭제된 습관은 복구할 수 없습니다.',
    cancelButtonText: '취소',
    confirmButtonText: '삭제하기',
  };

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
        disabled={isEditDisabled || isEditingDisabled}
        aria-label="Edit habit"
      />
      <ConfirmDialog contents={deleteContents} onClick={handleDelete}>
        <IconButton
          mode={ICONBUTTON_MODE.DELETE}
          disabled={isDeleteDisabled || isEditingDisabled}
          aria-label="Delete habit"
        />
      </ConfirmDialog>
    </nav>
  );
};

export default HabitItemActions;
