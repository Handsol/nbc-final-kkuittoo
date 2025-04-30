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
      <div className="flex flex-col gap-[2px] overflow-hidden">
        <UserTitle
          mode={USER_TITLE_MODE.CARD_NAME}
          className="truncate text-body-xs md:text-base max-w-[100px] md:max-w-[160px]"
        >
          {user.name}
        </UserTitle>
        <UserTitle
          mode={USER_TITLE_MODE.CARD_LEVEL}
          className="text-body-xs md:text-base"
        >
          Lv.{userLevel}
        </UserTitle>
      </div>

      <Text className="text-dark-gray truncate text-ellipsis text-body-xs max-w-[100px] md:max-w-[160px]">
        {user.bio}
      </Text>
    </section>
  );
};
