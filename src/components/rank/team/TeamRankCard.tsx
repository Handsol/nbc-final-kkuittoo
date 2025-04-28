'use client';

import { TeamCardProps } from '@/types/rank.type';
import { TopRankTeamCard } from './top/TopTeamRankCard';
import { NormalRankTeamCard } from './normal/NormalTeamRankCard.tsx';

export const TeamCard = ({
  team,
  rank,
  isTopRank,
  animationDelay,
}: TeamCardProps) => {
  return isTopRank ? (
    <TopRankTeamCard team={team} rank={rank} animationDelay={animationDelay} />
  ) : (
    <NormalRankTeamCard team={team} rank={rank} />
  );
};
