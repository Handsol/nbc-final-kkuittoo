import { Pencil } from 'lucide-react';

type EditProfileProps = {
  onClick: () => void;
};

const EditProfileButton = ({ onClick }: EditProfileProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-row justify-center items-center gap-2"
    >
      <Pencil className="w-[18px] h-[18px] text-main" />
      <p className="font-dohyeon text-body-sm pt-1 text-main">프로필 수정</p>
    </button>
  );
};

export default EditProfileButton;
