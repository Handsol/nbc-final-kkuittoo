'use client';

import CommonInputBar from '@/components/common/CommonInputBar';
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
    <>
      <div className="flex items-center space-x-2 mb-8">
        <button
          className="border rounded-2xl p-1 w-40 bg-gray-400 text-gray-600"
          disabled
        >
          Character
        </button>
        <Link href="/rank/teams">
          <button className="border rounded-2xl p-1 w-40 text-gray-600 hover:bg-gray-400">
            Team
          </button>
        </Link>
        <CommonInputBar
          id="userSearch"
          placeholder="캐릭터 이름을 검색해보세요."
        />
      </div>
      <div className="w-full max-w-[1024px] p-8 mx-auto bg-gray-400 rounded-2xl">
        {/* 상단 3명: 1, 2, 3위*/}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {topUsers.map((user, index) => (
              <div key={user.id}>
                <UserCard user={user} rank={index + 1} isTopRank={true} />
              </div>
            ))}
          </div>
        </div>

        {/* 하단: 나머지 유저 */}
        <div className="space-y-4">
          {otherUsers.map((user, index) => (
            <UserCard
              key={user.id}
              user={user}
              rank={index + 4}
              isTopRank={false}
            />
          ))}
        </div>
      </div>
    </>
  );
};
