import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenNotEditModeProps = {
  isOpened: boolean;
};

const TeamOpenNotEditMode = ({ isOpened }: TeamOpenNotEditModeProps) => {
  return (
    <>
      <div className="h-6 flex items-center gap-2">
        {isOpened ? <FaLockOpen /> : <FaLock />}
      </div>
    </>
  );
};

export default TeamOpenNotEditMode;
