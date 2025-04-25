import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { FaCheck } from 'react-icons/fa6';

type AppliedProps = {
  onClick: () => void;
};

const AppliedButton = ({ onClick }: AppliedProps) => {
  return (
    <ActionButton mode={ACTIONBUTTON_MODE.ROUNDED_MD_APPLIED} onClick={onClick}>
      <FaCheck className="w-[15px] h-[15px] text-main" />
      <p className="font-dohyeon text-body-sm text-main">적용됨</p>
    </ActionButton>
  );
};

export default AppliedButton;
