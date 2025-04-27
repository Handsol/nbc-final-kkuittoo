'use client';

import { useState } from 'react';
import { useTeamRankQuery } from '@/lib/queries/useTeamRankQuery';
import { TeamWithPoints } from '@/types/rank.type';
import { TeamCard } from './TeamRankCard';
import ActionButton from '@/components/common/button/ActionButton';

type Props = {
  initialTeams: TeamWithPoints[];
  hasTeam: boolean;
};

export const TeamShowMoreWrapper = ({ initialTeams, hasTeam }: Props) => {
  const [isFetchStarted, setIsFetchStarted] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useTeamRankQuery();

  const fetchedTeams = isFetchStarted ? (data?.pages.flat() ?? []) : [];
  const allTeams = [...initialTeams, ...fetchedTeams];

  const handleLoadMore = () => {
    console.log('팀 더보기 버튼 눌림'); // ✅ 콘솔 추가
    if (!isFetchStarted) {
      setIsFetchStarted(true);
    }
    fetchNextPage();
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {allTeams.map((team) => (
          <li key={team.id}>
            <TeamCard
              team={team}
              rank={team.rank ?? 0}
              isTopRank={false}
              hasTeam={hasTeam}
            />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <ActionButton
          mode="secondary"
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? '불러오는 중...'
            : hasNextPage === false && isFetchStarted
              ? '마지막입니다'
              : '더보기'}
        </ActionButton>
      </div>
    </div>
  );
};
