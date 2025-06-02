import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type ApplyProps = {
  onClick: () => void;
};

const ApplyButton = ({ onClick }: ApplyProps) => {
  return (
    <ActionButton mode={ACTIONBUTTON_MODE.ROUNDED_MD_APPLY} onClick={onClick}>
      적용하기
    </ActionButton>
  );
};

export default ApplyButton;
