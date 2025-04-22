import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type HabitFormActionsProps = {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
};

const HabitFormActions = ({
  onCancel,
  onSubmit,
  isSubmitting,
}: HabitFormActionsProps) => (
  <footer
    className="flex justify-center gap-[16px] mt-[16px]"
    aria-label="Form actions"
  >
    <ActionButton
      mode={ACTIONBUTTON_MODE.ROUNDED_MD_LIGHT_GRAY}
      onClick={onCancel}
      disabled={isSubmitting}
      aria-disabled={isSubmitting}
    >
      취소
    </ActionButton>
    <ActionButton
      mode={ACTIONBUTTON_MODE.ROUNDED_MD}
      onClick={onSubmit}
      disabled={isSubmitting}
      aria-disabled={isSubmitting}
    >
      완료
    </ActionButton>
  </footer>
);

export default HabitFormActions;
