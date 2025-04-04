import { fetchTeamMembers } from '@/lib/services/team-actions.services';
import TeamMemberCard from './TeamMemberCard';

type TeamMemberListProps = {
  id: string;
};

const TeamMemberList = async ({ id }: TeamMemberListProps) => {
  const teamMemberList = await fetchTeamMembers(id);

  if (!teamMemberList) {
    return <div>ERROR</div>;
  }

  return (
    <div className="flex-1 bg-neutral-400 rounded-3xl p-4">
      <p className="text-xl font-bold">Members</p>
      <ul className="flex flex-col gap-2">
        {teamMemberList.map((member) => {
          const { joinDate, user } = member;
          return (
            <TeamMemberCard key={user.id} joinDate={joinDate} member={user} />
          );
        })}
      </ul>
    </div>
  );
};

export default TeamMemberList;
