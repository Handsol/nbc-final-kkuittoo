import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import NoTeam from './NoTeam';

import TeamInfo from '../team/TeamInfo';

type DashboardTeamProps = {
  userId: string;
};

const DashboardTeam = async ({ userId }: DashboardTeamProps) => {
  // 해당 유저의 팀 정보 조회
  const myTeamWithMemberData = await fetchGetMyTeamData(userId);

  if (!myTeamWithMemberData) {
    return <NoTeam />;
  }

  // 팀 존재 = 팀 전체 포인트, 현재 퀘스트 정보 조회
  const myTeam = myTeamWithMemberData.team;

  return <TeamInfo id={myTeam.id} editMode={false} />;
};

export default DashboardTeam;
