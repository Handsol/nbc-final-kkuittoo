import TeamMemberCard from './TeamMemberCard';
import Title from '../common/Title';
import { JOINBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import { getUserLevel } from '@/lib/utils/user-level.utils';
import {
  fetchGetTeamData,
  fetchGetTeamMembers,
} from '@/lib/services/team-actions.services';
import TeamLeave from './TeamLeave';
import TeamInviteButton from './team-join/TeamInviteButton';
import TeamJoin from './TeamJoin';

type TeamMemberListProps = {
  id: string;
  userTeamInfo: {
    isThisTeamMember: boolean;
    isUserhasTeam: boolean;
    currentTeamMembers: number;
  };
};

const TeamMemberList = async ({ id, userTeamInfo }: TeamMemberListProps) => {
  const teamData = await fetchGetTeamData(id);
  const teamMemberList = await fetchGetTeamMembers(id);
  const { isThisTeamMember, isUserhasTeam, currentTeamMembers } = userTeamInfo;

  return (
    <div className="w-full flex flex-col gap-5 mt-11 mb-11">
      <div className="w-full flex justify-between items-center">
        <Title mode={TITLE_MODE.SECTION_TITLE}>팀 멤버</Title>
        {isThisTeamMember ? (
          <div className="flex gap-4">
            <TeamInviteButton id={id} />
            <TeamLeave id={id} />
          </div>
        ) : (
          <TeamJoin
            team={teamData}
            hasTeam={isUserhasTeam}
            currentMembers={currentTeamMembers as number}
            mode={JOINBUTTON_MODE.TEAM_PAGE}
          />
        )}
      </div>
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
