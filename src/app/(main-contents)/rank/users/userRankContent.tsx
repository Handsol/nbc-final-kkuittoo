'use client';

import { UserCard } from '@/components/rank/UserRankCard';
import { useUserQuery } from '@/lib/queries/useUserQuery';
import Link from 'next/link';

// 유저 랭킹 UI
export const UserRankContent = () => {
  const { data: users, isPending, isError } = useUserQuery();
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  // 포인트 기준으로 유저를 정렬 (내림차순)
  const sortedUsers = [...users].sort((a, b) => {
    const aPoints = a.userPoints.reduce((sum, p) => sum + p.points, 0);
    const bPoints = b.userPoints.reduce((sum, p) => sum + p.points, 0);
    return bPoints - aPoints; // 높은 포인트가 위로
  });
  const topUsers = sortedUsers.slice(0, 3); // 1~3위
  const otherUsers = sortedUsers.slice(3); // 4위부터

  return (
    <div className="container mx-auto p-4 bg-gray-400 rounded-lg">
      <h1 className="text-3xl font-bold mb-6">유저 랭킹</h1>
      <button className="border rounded-2xl p-1 text-gray-600" disabled>
        Character
      </button>
      <Link href="/rank/teams">
        <button className="border rounded-2xl p-1 text-gray-600">Team</button>
      </Link>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedUsers.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};
