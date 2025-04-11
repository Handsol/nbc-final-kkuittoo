import {
  fetchGetMyTeamData,
  fetchGetTeamTotalPoints,
} from '@/lib/services/team-actions.services';
import NoTeam from './NoTeam';
import MyTeam from './MyTeam';
import Text from '../common/Text';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';

type MyPageTeamProps = {
  userId: string;
};

const MyPageTeam = async ({ userId }: MyPageTeamProps) => {
  // 해당 유저의 팀 정보 조회
  const myTeamWithMemberData = await fetchGetMyTeamData(userId);

  if (!myTeamWithMemberData) {
    return <NoTeam />;
  }

  // 팀 존재 = 팀 전체 포인트, 현재 퀘스트 정보 조회
  const myTeam = myTeamWithMemberData.team;
  const { teamTotalPoints } = await fetchGetTeamTotalPoints(myTeam.id);
  const teamCurrentQuest = getCurrentTeamQuest(teamTotalPoints);

  return (
    <MyTeam
      team={myTeam}
      teamTotalPoints={teamTotalPoints}
      teamCurrentQuest={teamCurrentQuest}
    />
  );
};

export default MyPageTeam;
