import { UserData } from '@/types/rank.type';
import { TopUserRankLabel } from './TopUserRankLabel';
import { TopUserAvatar } from './TopUserAvatar';
import { TopUserInfo } from './TopUserInfo';

type Props = {
  user: UserData;
  rank: number;
};

export const TopUserRankCard = ({ user, rank }: Props) => {
  return (
    <article className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center">
      <TopUserRankLabel rank={rank} />
      <TopUserAvatar userName={user.name} image={user.image} />
      <TopUserInfo user={user} />
    </article>
  );
};
