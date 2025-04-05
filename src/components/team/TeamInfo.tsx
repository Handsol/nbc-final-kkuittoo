import {
  fetchGetCurrentTeamQuest,
  fetchGetTeamTotalPoints,
  fetchTeamData,
} from '@/lib/services/team-actions.services';
import { Progress } from '../ui/progress';
import Image from 'next/image';
import TeamBio from './TeamBio';

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
    <section className="w-full flex bg-neutral-400 rounded-3xl p-9 gap-5">
      <div className="relative w-64 h-60">
        <Image
          src={'/teamQuest'}
          alt="teamQuest"
          fill
          className="bg-neutral-500 rounded-3xl"
        />
        <img
          src={emblem}
          alt="emblem"
          className="w-14 h-14 rounded-full bg-neutral-700 absolute bottom-3 right-3"
        />
      </div>
      <article className="flex-1 flex flex-col gap-3 justify-center relative">
        <section className="absolute right-0 top-8 flex flex-col justify-center items-center gap-3">
          <button className="px-2 h-6 text-center bg-white rounded-full text-xs">
            PRIVATE
          </button>
        </section>
        <p className="font-bold text-2xl">{teamName}</p>
        <p className="font-bold text-4xl">{teamCurrentQuest.questName}</p>
        <section>
          <Progress value={teamTotalPoints} className="w-full h-5" />
          <p>
            {teamTotalPoints}/{teamCurrentQuest.requiredPoints}
          </p>
        </section>

        <TeamBio teamBio={teamBio} teamId={id} />
      </article>
    </section>
  );
};

export default TeamInfo;
