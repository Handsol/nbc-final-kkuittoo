import { UserData } from '@/types/rank.type';
import Image from 'next/image';

type Props = {
  user: UserData;
  rank: number;
};

export const TopRankCard = ({ user, rank }: Props) => {
  return (
    <div className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        {rank}
        {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
      </h2>
      <div className="w-28 h-28 mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
        <Image
          src={user.image ?? '/images/default.png'}
          alt={user.name ?? '유저 이미지'}
          width={112}
          height={112}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Lv. 1</p>
        <h2 className="text-xl font-bold text-gray-700">{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
