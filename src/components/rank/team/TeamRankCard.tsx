import { TeamCardProps } from '@/types/rank.type';
import { TopRankTeamCard } from './top/TopTeamRankCard';
import { NormalRankTeamCard } from './normal/NormalTeamRankCard.tsx';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import UnauthorizedPage from '@/components/loading-error-page/UnauthorizedPage';

// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
// isTopRank로 상단 3위와 나머지 스타일 구별

export const TeamCard = async ({
  team,
  rank,
  isTopRank,
  animationDelay,
}: TeamCardProps) => {
  //유저 정보
  const session = await getUserSession();
  if (!session) {
    return <UnauthorizedPage />;
  }

  const userId = session.user.id;
  const userTeamData = await fetchGetMyTeamData(userId);
  const hasTeam = userTeamData ? true : false;

  return isTopRank ? (
    <TopRankTeamCard
      team={team}
      rank={rank}
      hasTeam={hasTeam}
      animationDelay={animationDelay}
    />
  ) : (
    <NormalRankTeamCard team={team} rank={rank} hasTeam={hasTeam} />
  );
};
