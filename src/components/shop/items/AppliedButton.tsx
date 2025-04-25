import { FaCheck } from 'react-icons/fa6';

type AppliedProps = {
  onClick: () => void;
};

const AppliedButton = ({ onClick }: AppliedProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row items-center justify-center gap-2 w-[115px] h-[36px] bg-sub-light text-main border-2 border-main rounded-md hover:bg-sub "
    >
      <FaCheck className="w-[15px] h-[15px] text-main" />
      <p className="font-dohyeon text-body-sm text-main">Applied</p>
    </button>
  );
};

export default AppliedButton;
