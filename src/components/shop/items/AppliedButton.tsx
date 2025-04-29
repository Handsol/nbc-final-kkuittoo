import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { FaCheck } from 'react-icons/fa6';

type AppliedProps = {
  onClick: () => void;
};

const AppliedButton = ({ onClick }: AppliedProps) => {
  return (
    <ActionButton mode={ACTIONBUTTON_MODE.ROUNDED_MD_APPLIED} onClick={onClick}>
      <FaCheck className="w-[12px] h-[12px]" />
      적용됨
    </ActionButton>
  );
};

export default AppliedButton;
