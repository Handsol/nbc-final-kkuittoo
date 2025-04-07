import {
  fetchGetCurrentTeamQuest,
  fetchGetMyTeamData,
  fetchGetTeamTotalPoints,
} from '@/lib/services/team-actions.services';
import NoTeam from './NoTeam';
import MyTeam from './MyTeam';

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
  const teamCurrentQuest = await fetchGetCurrentTeamQuest(teamTotalPoints);

  if (!teamCurrentQuest) {
    return <div>퀘스트 데이터를 가져오는데 실패했습니다.</div>;
  }

  return (
    <>
      <MyTeam
        team={myTeam}
        teamTotalPoints={teamTotalPoints}
        teamCurrentQuest={teamCurrentQuest}
      />
    </>
  );
};

export default MyPageTeam;
