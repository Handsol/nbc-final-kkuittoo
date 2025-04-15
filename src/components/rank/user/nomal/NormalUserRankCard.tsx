'use client';

import { UserData } from '@/types/rank.type';
import { NormalUserRankLabel } from './NormalUserRankLabel';
import { NormalUserAvatar } from './NormalUserAvatar';
import { NormalUserInfo } from './NormalUserInfo';

type Props = {
  user: UserData;
  rank: number;
};

export const NormalUserRankCard = ({ user, rank }: Props) => {
  return (
    <article className="border rounded-3xl p-4 shadow-md bg-gray-100 w-full h-24 flex flex-row items-center">
      <NormalUserRankLabel rank={rank} />
      <NormalUserAvatar userName={user.name} image={user.image} />
      <NormalUserInfo user={user} />
    </article>
  );
};
