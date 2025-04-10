import { TeamCardProps } from '@/types/rank.type';
import { TopRankTeamCard } from './TeamTopRankCard';
import { NormalRankTeamCard } from './TeamNormalRankCard';

type Props = TeamCardProps & {
  onClick?(): void; // 카드 클릭 시 실행할 함수(모달 열기용)
};

// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
// isTopRank로 상단 3위와 나머지 스타일 구별

export const TeamCard = ({ team, rank, isTopRank, onClick }: Props) => {
  return isTopRank ? (
    <TopRankTeamCard team={team} rank={rank} onClick={onClick} />
  ) : (
    <NormalRankTeamCard team={team} rank={rank} onClick={onClick} />
  );
};
