'use client';

import { UserCardProps } from '@/types/rank.type';
import { TopUserRankCard } from './top/TopUserRankCard';
import { NormalUserRankCard } from './nomal/NormalUserRankCard';

// 유저 정보를 카드로 보여주는 컴포넌트
// isTopRank로 상단 3위와 나머지 스타일 구별
export const UserRankCard = ({ user, rank, isTopRank }: UserCardProps) => {
  return isTopRank ? (
    <TopUserRankCard user={user} rank={rank} />
  ) : (
    <NormalUserRankCard user={user} rank={rank} />
  );
};
