'use client';

import { UserCardProps } from '@/types/rank.type';
import { TopUserRankCard } from './top/TopUserRankCard';
import { NormalUserRankCard } from './nomal/NormalUserRankCard';

// 유저 정보를 카드로 보여주는 컴포넌트
export const UserRankCard = ({
  user,
  rank,
  isTopRank,
  animationDelay,
}: UserCardProps) => {
  return isTopRank ? (
    <TopUserRankCard user={user} rank={rank} animationDelay={animationDelay} />
  ) : (
    <NormalUserRankCard user={user} rank={rank} />
  );
};
