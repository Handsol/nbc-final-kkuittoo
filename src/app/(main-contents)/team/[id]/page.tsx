import TeamCalendar from '@/components/team/TeamCalendar';
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
    <div className="w-screen flex flex-col gap-8 p-10">
      <TeamInfo id={id} />
      <div className="flex gap-8">
        <TeamMemberList id={id} />
        <TeamCalendar />
      </div>
      <div className="flex-1 border border-black">CHAT</div>
    </div>
  );
};

export default TeamPage;
