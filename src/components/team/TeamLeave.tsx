import {
  fetchGetMyTeamData,
  fetchGetMyTeamMemberData,
} from '@/lib/services/team-actions.services';
import { authOptions } from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';
import TeamLeaveButton from './team-delete/TeamLeaveButton';
import TeamDisbandButton from './team-delete/TeamDisbandButton';

type TeamLeaveProps = {
  id: string;
};

const TeamLeave = async ({ id }: TeamLeaveProps) => {
  // 현재 로그인한 유저 정보
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return <p className="text-lg">로그인이 필요합니다.</p>;
  }
  const userId = session.user.id;

  // 팀 기본 데이터
  const myTeamData = await fetchGetMyTeamData(userId);
  if (!myTeamData) {
    return <p>데이터를 가져오는데 실패했습니다</p>;
  }
  const myTeamMembers = await fetchGetMyTeamMemberData(id);
  if (!myTeamMembers) {
    return <p>데이터를 가져오는데 실패했습니다</p>;
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
