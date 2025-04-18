import {
  fetchGetMyTeamData,
  fetchGetMyTeamMemberData,
} from '@/lib/services/team-actions.services';
import TeamLeaveButton from './team-delete/TeamLeaveButton';
import TeamDisbandButton from './team-delete/TeamDisbandButton';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { notFound } from 'next/navigation';
import UnauthorizedPage from '../loading-error-page/UnauthorizedPage';

type TeamLeaveProps = {
  id: string;
};

const TeamLeave = async ({ id }: TeamLeaveProps) => {
  // 현재 로그인한 유저 정보
  const session = await getUserSession();
  if (!session || !session.user) {
    return <UnauthorizedPage />;
  }
  const userId = session.user.id;

  // 팀 기본 데이터
  const myTeamData = await fetchGetMyTeamData(userId);
  if (!myTeamData) {
    notFound();
  }
  const myTeamMembers = await fetchGetMyTeamMemberData(id);
  if (!myTeamMembers) {
    notFound();
  }

  // 팀 생성자 여부 판단
  const isOwner = myTeamData.team.ownerId === userId;
  const teamMemberId = myTeamData.id;

  return (
    <div>
      {isOwner ? (
        <TeamDisbandButton
          teamId={id}
          ownerId={myTeamData.team.ownerId}
          memberList={myTeamMembers}
        />
      ) : (
        <TeamLeaveButton id={teamMemberId} />
      )}
    </div>
  );
};

export default TeamLeave;
