'use client';

import { TeamCard } from '@/components/rank/TeamRankCard';
import { useTeamQuery } from '@/lib/queries/useTeamQuery';
import { TeamWithPoints } from '@/types/rank-users.type';
import Link from 'next/link';

// 팀 랭킹 UI
export const TeamRankContent = () => {
  const {
    data: teams = [] as TeamWithPoints[],
    isPending,
    isError,
  } = useTeamQuery(); // 데이터 가져오기
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">팀 랭킹</h1>
      <Link href="/rank/users">
        <button>유저 랭킹</button>
      </Link>
      <button disabled>팀 랭킹</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <TeamCard key={team.id} team={team} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};
