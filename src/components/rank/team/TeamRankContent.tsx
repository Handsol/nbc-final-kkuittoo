import { fetchGetTeamsWithPoints } from '@/lib/services/team-actions.services';
import { TeamRankHeader } from './TeamRankHeader';
import { OtherTeamsSection } from './TeamOtherSection';
import { TeamTopSection } from './TeamTopSection';
import { searchTeams } from '@/lib/services/search-actions.services';

type TeamRankContentProps = {
  searchParams?: { q?: string };
};

// 팀 랭킹 UI
export const TeamRankContent = async ({
  searchParams,
}: TeamRankContentProps) => {
  const searchTerm = searchParams?.q || '';

  const teamsList = await fetchGetTeamsWithPoints();

  const topTeams = teamsList.slice(0, 3); // 1~3위
  const otherTeams = searchTerm
    ? await searchTeams(searchTerm)
    : teamsList.slice(3);
  return (
    <div className="flex flex-col gap-4">
      <TeamRankHeader />
      <section className="w-full max-w-[1024px] p-8 mx-auto bg-white rounded-2xl">
        <TeamTopSection topTeams={topTeams} />
        <OtherTeamsSection otherTeams={otherTeams} />
      </section>
    </div>
  );
};
