import {
  fetchGetMyTeamData,
  fetchGetFilteredTeamsWithTotalPoints,
} from '@/lib/services/team-actions.services';
import { TeamRankHeader } from './TeamRankHeader';
import { OtherTeamsSection } from './TeamOtherSection';
import { TeamTopSection } from './TeamTopSection';
import { searchTeams } from '@/lib/services/search-actions.services';
import { getUserSession } from '@/lib/services/getUserSession.services';
import UnauthorizedPage from '@/components/loading-error-page/UnauthorizedPage';

type TeamRankContentProps = {
  searchParams?: { q?: string };
};

// 팀 랭킹 UI
export const TeamRankContent = async ({
  searchParams,
}: TeamRankContentProps) => {
  const searchTerm = searchParams?.q || '';
  const isSearching = Boolean(searchTerm);

  const session = await getUserSession();
  if (!session) {
    return <UnauthorizedPage />;
  }
  const userId = session?.user.id;
  const userTeamData = await fetchGetMyTeamData(userId);
  const hasTeam = userTeamData ? true : false;

  const teamsList = await fetchGetFilteredTeamsWithTotalPoints();

  const topTeams = teamsList.slice(0, 3); // 1~3위
  const otherTeams = searchTerm
    ? await searchTeams(searchTerm)
    : teamsList.slice(3);
  return (
    <div className="flex flex-col gap-4">
      <TeamRankHeader />
      <section className="w-full max-w-[1440px] p-8 mx-auto bg-white rounded-2xl">
        <TeamTopSection topTeams={topTeams} hasTeam={hasTeam} />
        <OtherTeamsSection
          otherTeams={otherTeams}
          isSearching={isSearching}
          hasTeam={hasTeam}
        />
      </section>
    </div>
  );
};
