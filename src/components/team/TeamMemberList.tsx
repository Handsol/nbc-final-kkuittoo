import { fetchTeamMembers } from '@/lib/services/team-actions.services';
import TeamMemberCard from './TeamMemberCard';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import { getUserLevel } from '@/lib/utils/user-level.utils';

type TeamMemberListProps = {
  id: string;
};

const TeamMemberList = async ({ id }: TeamMemberListProps) => {
  const teamMemberList = await fetchTeamMembers(id);

  // 이부분 수정예정
  if (!teamMemberList) {
    return <div>ERROR</div>;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <Title mode={TITLE_MODE.SECTION_TITLE}>Members</Title>
      <ul className="w-full flex flex-col gap-2">
        {teamMemberList.map((member, index) => {
          const { user, totalPoints, totalContribution } = member;
          const memberLevel = getUserLevel(totalPoints);
          return (
            <TeamMemberCard
              key={user.id}
              rank={index + 1}
              member={user}
              memberLevel={memberLevel}
              totalContribution={totalContribution}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TeamMemberList;
