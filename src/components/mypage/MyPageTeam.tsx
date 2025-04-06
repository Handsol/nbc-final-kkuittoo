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
  //팀 정보 조회 - 이부분은 나중에 team-actions.services.ts로 뺴야할 거 같은데, 일단 여기에 둘게요
  const fetchGetTeamMemberData = await prisma.teamMember.findFirst({
    where: { userId },
    include: { team: true },
  });

  //팀 가입여부 확인(테스트용으로 false를 사용하는데, 추후 삭제하겠습니다.)
  const hasTeam = !!fetchGetTeamMemberData?.team;
  // const hasTeam = false;

  //팀이 없을 경우
  if (!hasTeam) {
    return <NoTeam />;
  }

  //팀이 있으면 추가적으로 데이터 조회
  const team = fetchGetTeamMemberData.team;
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
