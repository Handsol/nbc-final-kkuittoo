import { UserData } from '@/types/rank-users.type';

// 유저 정보를 카드로 보여주는 컴포넌트예요. TeamCard와 스타일을 맞췄습니다
export const UserCard = ({ user, rank }: { user: UserData; rank: number }) => {
  // userPoints 배열의 포인트를 합산해요
  const totalPoints = user.userPoints.reduce(
    (sum, point) => sum + point.points,
    0,
  );

  return (
    <div className="border rounded-lg p-4 w-80 shadow-md">
      <img
        src={user.image || '/default-user.png'}
        alt={`${user.name}`}
        className="w-16 h-16 mb-2"
      />
      <h2 className="text-xl font-bold">
        {rank}. {user.name}
      </h2>
      <p className="text-gray-600">{user.bio || '소개 없음'}</p>
      <p className="text-sm mt-2">포인트: {totalPoints}</p>
    </div>
  );
};
