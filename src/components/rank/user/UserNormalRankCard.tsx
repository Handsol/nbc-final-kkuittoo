import { UserData } from '@/types/rank.type';
import Image from 'next/image';

interface Props {
  user: UserData;
  rank: number;
}

export const NormalRankCard = ({ user, rank }: Props) => {
  return (
    <div className="border rounded-3xl p-4 shadow-md bg-gray-100 w-full h-24 flex flex-row items-center">
      <div className="mr-4">
        <h2 className="text-xl font-bold text-gray-700">
          {rank}
          {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
        </h2>
      </div>
      <div className="w-16 h-16 mr-4 bg-gray-300 rounded-lg flex items-center justify-center">
        <Image
          src={user.image ?? '/images/default.png'}
          alt={user.name ?? '유저 이미지'}
          width={64}
          height={64}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">Lv. 1</p>
        <h2 className="text-xl font-bold text-gray-700">{user.name}</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
