type ApplyButtonProps = {
  onClick: () => void;
};

const ApplyButton = ({ onClick }: ApplyButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-[75px] h-[36px] bg-white text-main border-2 border-main rounded-md hover:bg-sub "
    >
      <p className="font-dohyeon text-body-sm text-main">Apply</p>
    </button>
  );
};

export default ApplyButton;
