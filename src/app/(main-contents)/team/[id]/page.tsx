import { TeamChat } from '@/components/team/TeamChat';
import TeamInfo from '@/components/team/TeamInfo';
import TeamMemberList from '@/components/team/TeamMemberList';
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

  return (
    <section className="w-full">
      <TeamInfo id={id} />
      <article className="w-full px-10">
        <TeamMemberList id={id} />
        <TeamChat teamId={id} />
      </article>
    </section>
  );
};

export default TeamPage;
