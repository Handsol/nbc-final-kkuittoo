'use client';

import { UserCardProps } from '@/types/rank.type';
import { TopRankCard } from './UserTopRankCard';
import { NormalRankCard } from './UserNormalRankCard';

// 유저 정보를 카드로 보여주는 컴포넌트
// isTopRank로 상단 3위와 나머지 스타일 구별
export const UserCard = ({ user, rank, isTopRank }: UserCardProps) => {
  return isTopRank ? (
    <TopRankCard user={user} rank={rank} />
  ) : (
    <NormalRankCard user={user} rank={rank} />
  );
};
