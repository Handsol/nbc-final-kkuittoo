import TeamCalendar from '@/components/team/TeamCalendar';
import { TeamChat } from '@/components/team/TeamChat';
import TeamInfo from '@/components/team/TeamInfo';
import TeamLeave from '@/components/team/TeamLeave';
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
    <section className="w-full flex flex-col gap-4 p-3">
      <article className="w-full flex justify-end items-center">
        <TeamLeave id={id} />
      </article>
      <TeamInfo id={id} />
      <article className="flex gap-8">
        <TeamMemberList id={id} />
        <TeamCalendar />
      </article>
      <TeamChat teamId={id} />
    </section>
  );
};

export default TeamPage;
