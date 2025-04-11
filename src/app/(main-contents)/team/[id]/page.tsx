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
    <section className="w-full pt-5 px-10">
      <article className="w-full flex justify-end items-center mb-5">
        <TeamLeave id={id} />
      </article>
      <article className="w-full flex flex-col gap-10">
        <TeamInfo id={id} />
        <TeamMemberList id={id} />
        <TeamChat teamId={id} />
      </article>
    </section>
  );
};

export default TeamPage;
