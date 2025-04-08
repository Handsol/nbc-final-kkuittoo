import TeamCalendar from '@/components/team/TeamCalendar';
import { TeamChat } from '@/components/team/TeamChat';
import TeamInfo from '@/components/team/TeamInfo';
import TeamMemberList from '@/components/team/TeamMemberList';

type RouteParams = {
  params: {
    id: string;
  };
};

const TeamPage = async ({ params }: RouteParams) => {
  const id = params.id;

  return (
    <article className="w-full flex flex-col gap-4 p-3">
      <section className="w-full flex justify-end items-center">
        <button className="px-8 h-8 text-center bg-white rounded-full">
          LEAVE
        </button>
      </section>
      <TeamInfo id={id} />
      <section className="flex gap-8">
        <TeamMemberList id={id} />
        <TeamCalendar />
      </section>
      <TeamChat teamId={id} />
    </article>
  );
};

export default TeamPage;
