import { TeamCardProps } from '@/types/rank.type';
import { TopRankTeamCard } from './TeamTopRankCard';
import { NormalRankTeamCard } from './TeamNormalRankCard';

// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
// isTopRank로 상단 3위와 나머지 스타일 구별

export const TeamCard = ({ team, rank, isTopRank }: TeamCardProps) => {
  return isTopRank ? (
    <TopRankTeamCard team={team} rank={rank} />
  ) : (
    <NormalRankTeamCard team={team} rank={rank} />
  );
};
