import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenNotEditModeProps = {
  isOpened: boolean;
};

const TeamOpenNotEditMode = ({ isOpened }: TeamOpenNotEditModeProps) => {
  return (
    <>
      {isOpened ? (
        <div className="flex items-center gap-2">
          <FaLockOpen />
          <p>OPEN</p>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FaLock />
          <p>PRIVATE</p>
        </div>
      )}
    </>
  );
};

export default TeamOpenNotEditMode;
