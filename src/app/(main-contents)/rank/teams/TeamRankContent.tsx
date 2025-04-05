'use client';

import { TeamCard } from '@/components/rank/TeamRankCard';
import { useTeamQuery } from '@/lib/queries/useTeamQuery';

// 팀 랭킹 UI
export const TeamRankContent = () => {
  const { data: teams, isPending, isError } = useTeamQuery(); // 데이터 가져오기
  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">팀 랭킹</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
};
