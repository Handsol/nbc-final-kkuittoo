import Text from '@/components/common/Text';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { getUserLevel } from '@/lib/utils/user-level.utils';
import { UserData } from '@/types/rank.type';

type Props = { user: UserData };

export const NormalUserInfo = ({ user }: Props) => {
  const userLevel = getUserLevel(user.totalPoints);
  return (
    <section className="flex-1">
      <div className="flex flex-row items-center gap-3">
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{user.name}</UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv.{userLevel}</UserTitle>
      </div>
      <Text className="text-dark-gray truncate">{user.bio}</Text>
    </section>
  );
};
