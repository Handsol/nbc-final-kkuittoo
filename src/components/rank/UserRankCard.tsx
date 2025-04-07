import { UserCardProps } from '@/types/rank-users.type';
import Image from 'next/image';

// 유저 정보를 카드로 보여주는 컴포넌트
// isTopRank로 상단 3위와 나머지 스타일 구별
export const UserCard = ({ user, rank, isTopRank }: UserCardProps) => {
  const imageSize = isTopRank ? 112 : 64;

  return (
    <div
      className={`border rounded-3xl p-4 shadow-md bg-gray-100 ${
        isTopRank
          ? 'w-54 h-64 flex flex-col items-center justify-center'
          : 'w-full h-24 flex flex-row items-center'
      }`}
    >
      <div
        className={
          isTopRank ? 'flex flex-col items-center' : 'flex items-center w-full'
        }
      >
        <div className={isTopRank ? 'mb-2' : 'mr-4'}>
          <h2 className="text-xl font-bold text-gray-700">
            {rank}
            {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
          </h2>
        </div>
        <div
          className={`${
            isTopRank ? 'w-28 h-28 mb-2' : 'w-16 h-16 mr-4'
          } bg-gray-300 rounded-lg flex items-center justify-center`}
        >
          <Image
            src={user.image}
            alt={`${user.name}`}
            width={imageSize}
            height={imageSize}
            className="object-cover rounded-lg"
          />
        </div>
        <div className={isTopRank ? 'text-center' : 'flex-1'}>
          <p className="text-sm text-gray-600">Lv. 1</p>
          <h2 className="text-xl font-bold text-gray-700">{user.name}</h2>
          <p>{user.bio}</p>
        </div>
      </div>
    </div>
  );
};
