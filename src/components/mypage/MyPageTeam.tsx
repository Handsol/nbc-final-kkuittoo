import { prisma } from '@/lib/prisma';
import {
  fetchGetCurrentTeamQuest,
  fetchGetTeamTotalPoints,
} from '@/lib/services/team-actions.services';
import NoTeam from './NoTeam';
import MyTeam from './MyTeam';

type MyPageTeamProps = {
  userId: string;
};

const MyPageTeam = async ({ userId }: MyPageTeamProps) => {
  const teamMemberData = await prisma.teamMember.findFirst({
    where: { userId },
    include: { team: true },
  });

  const hasTeam = !!teamMemberData?.team;
  // const hasTeam = false;

  if (!hasTeam) {
    return <NoTeam />;
  }

  const team = teamMemberData.team;
  const { teamTotalPoints } = await fetchGetTeamTotalPoints(team.id);
  const teamCurrentQuest = await fetchGetCurrentTeamQuest(teamTotalPoints);

  if (!teamCurrentQuest) {
    return <div>퀘스트 데이터를 가져오는데 실패했습니다.</div>;
  }

  return (
    <MyTeam
      team={team}
      teamTotalPoints={teamTotalPoints}
      teamCurrentQuest={teamCurrentQuest}
    />
  );
};

export default MyPageTeam;
