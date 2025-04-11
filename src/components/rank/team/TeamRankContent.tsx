import { fetchGetTeamsWithPoints } from '@/lib/services/team-actions.services';
import { TeamRankHeader } from './TeamRankHeader';
import { OtherTeamsSection } from './TeamOtherSection';
import { TeamTopSection } from './TeamTopSection';

// 팀 랭킹 UI
export const TeamRankContent = async () => {
  const teamsList = await fetchGetTeamsWithPoints();
  const topTeams = teamsList.slice(0, 3); // 1~3위
  const otherTeams = teamsList.slice(3); // 4위부터
  return (
    <div className="flex flex-col gap-4">
      <TeamRankHeader />
      <section className="w-full max-w-[1024px] p-8 mx-auto bg-gray-400 rounded-2xl">
        <TeamTopSection topTeams={topTeams} />
        <OtherTeamsSection otherTeams={otherTeams} />
      </section>
    </div>
  );
};
