import {
  fetchGetCurrentTeamQuest,
  fetchGetTeamTotalPoints,
  fetchTeamData,
} from '@/lib/services/team-actions.services';
import { Progress } from '../ui/progress';

type TeamQuestProps = {
  id: string;
};

const TeamInfo = async ({ id }: TeamQuestProps) => {
  //팀 기본 데이터
  const teamData = await fetchTeamData(id);
  // 팀의 전체 포인트와 현재 퀘스트를 가져오는 로직
  const { teamTotalPoints } = await fetchGetTeamTotalPoints(id);
  const teamCurrentQuest = await fetchGetCurrentTeamQuest(teamTotalPoints);

  if (!teamData || !teamCurrentQuest) {
    return <p>데이터를 가져오는데 실패했습니다</p>;
  }

  const { teamName, teamBio, emblem } = teamData;

  return (
    <div className="w-full flex border border-black">
      <div className="flex flex-1 items-center gap-5">
        <img
          src={emblem}
          alt="team_emblem"
          className="w-20 h-20 rounded-full bg-slate-300"
        />
        <div>
          <p>{teamName}</p>
          <p>{teamBio}</p>
        </div>
      </div>
      <div className="flex flex-1 items-center gap-3">
        <div className="flex-1">
          <p>{teamCurrentQuest.questName}</p>
          <p>
            {teamTotalPoints}/{teamCurrentQuest.requiredPoints}
          </p>
          <Progress value={teamTotalPoints} />
        </div>
        <img
          src={teamCurrentQuest.questImage}
          alt="teamQuest"
          className="w-80 h-52 rounded-3xl bg-slate-300"
        />
      </div>
    </div>
  );
};

export default TeamInfo;
