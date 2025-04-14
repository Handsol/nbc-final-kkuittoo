import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { UserData } from '@/types/rank.type';

type Props = { user: UserData };

export const TopUserInfo = ({ user }: Props) => {
  return (
    <section className="text-center">
      <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv. 1</UserTitle>
      <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{user.name}</UserTitle>
      <p>{user.bio}</p>
    </section>
  );
};
