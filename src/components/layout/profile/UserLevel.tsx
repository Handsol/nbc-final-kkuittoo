import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';

type UserLevelProps = {
  level: number;
};

const UserLevel = ({ level }: UserLevelProps) => {
  return <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv.{level}</UserTitle>;
};

export default UserLevel;
