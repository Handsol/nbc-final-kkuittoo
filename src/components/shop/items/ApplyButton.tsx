import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type ApplyProps = {
  onClick: () => void;
};

const ApplyButton = ({ onClick }: ApplyProps) => {
  return (
    <ActionButton mode={ACTIONBUTTON_MODE.ROUNDED_MD_APPLY} onClick={onClick}>
      <p className="font-dohyeon text-body-sm text-main">적용하기</p>
    </ActionButton>
  );
};

export default ApplyButton;
