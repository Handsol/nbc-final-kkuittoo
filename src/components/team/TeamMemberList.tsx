import TeamMemberCard from './TeamMemberCard';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import { getUserLevel } from '@/lib/utils/user-level.utils';
import { fetchGetTeamMembers } from '@/lib/services/team-actions.services';
import TeamLeave from './TeamLeave';

type TeamMemberListProps = {
  id: string;
};

const TeamMemberList = async ({ id }: TeamMemberListProps) => {
  const teamMemberList = await fetchGetTeamMembers(id);

  return (
    <div className="w-full flex flex-col gap-5 mt-11 mb-11">
      <div className="w-full flex justify-between items-center">
        <Title mode={TITLE_MODE.SECTION_TITLE}>Members</Title>
        <TeamLeave id={id} />
      </div>
      <ul className="w-full flex flex-col gap-2">
        {teamMemberList.map((member, index) => {
          const { user, totalPoints, totalContribution } = member;
          const memberItemList = member.user.userItems;
          const memberLevel = getUserLevel(totalPoints);
          return (
            <TeamMemberCard
              key={user.id}
              rank={index + 1}
              member={user}
              memberLevel={memberLevel}
              memberItemList={memberItemList}
              totalContribution={totalContribution}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TeamMemberList;
