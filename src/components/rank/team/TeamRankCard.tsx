import { TeamCardProps } from '@/types/rank.type';
import { TopRankTeamCard } from './top/TopTeamRankCard';
import { NormalRankTeamCard } from './normal/NormalTeamRankCard.tsx';

// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
// isTopRank로 상단 3위와 나머지 스타일 구별
export const TeamCard = async ({
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
