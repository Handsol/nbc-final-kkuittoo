import { TeamChat } from '@/components/team/TeamChat';
import TeamInfo from '@/components/team/TeamInfo';
import TeamMemberList from '@/components/team/TeamMemberList';
import { MobileTeamTabs } from '@/components/team/TeamTab';
import {
  generateTeamMetadata,
  TEAM_METADATA_MODE,
} from '@/lib/seo/generateTeamMetadata';

type RouteParams = {
  params: {
    id: string;
  };
};

export const generateMetadata = async ({ params }: RouteParams) => {
  return await generateTeamMetadata(TEAM_METADATA_MODE.SINGLE_TEAM, params.id);
};

const TeamPage = async ({ params }: RouteParams) => {
  const id = params.id;

  const membersTab = <TeamMemberList id={id} />;
  const chatTab = <TeamChat teamId={id} />;

  return (
    <section className="w-full">
      <TeamInfo id={id} />

      {/* 모바일용 */}
      <MobileTeamTabs membersTab={membersTab} chatTab={chatTab} />

      {/* 데스크탑 */}
      <article className="hidden md:block w-full px-10">
        {membersTab}
        {chatTab}
      </article>
    </section>
  );
};

export default TeamPage;
