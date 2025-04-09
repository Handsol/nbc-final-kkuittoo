import Text from '@/components/common/Text';
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
          <Text>OPEN</Text>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <FaLock />
          <Text>PRIVATE</Text>
        </div>
      )}
    </>
  );
};

export default TeamOpenNotEditMode;
