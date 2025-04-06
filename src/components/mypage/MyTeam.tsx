import { Progress } from '@/components/ui/progress';
import { TeamData } from '@/types/teams.type';
import { TeamQuest } from '@prisma/client';
import Image from 'next/image';

type MyTeamProps = {
  team: Pick<TeamData, 'id' | 'teamName' | 'teamBio' | 'emblem'>;
  teamTotalPoints: number;
  teamCurrentQuest: Pick<TeamQuest, 'questName' | 'requiredPoints'>;
};

const MyTeam = ({ team, teamTotalPoints, teamCurrentQuest }: MyTeamProps) => {
  const contributionPercentage = Math.min(
    (teamTotalPoints / teamCurrentQuest.requiredPoints) * 100,
    100,
  );

  return (
    <section className="h-full w-[680px] bg-gray-300 p-6 rounded-3xl flex flex-col">
      {/* 제목 */}
      <div className="mb-4">
        <h1 className="text-xl font-bold">MY TEAM</h1>
      </div>
      {/* 메인 영역 */}
      <div className="w-full max-w-5xl flex flex-row gap-4">
        <div className="w-2/5 flex items-center justify-center relative">
          {/* 팀의 퀘스트 이미지 - 현재는 테스트 이미지를 사용하고 있습니다 */}
          <Image
            src="/images/test01.png"
            alt="Team Quest Image"
            fill
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        {/* 팀 정보  */}
        <div className="w-3/5 flex flex-col gap-3 text-sm">
          <h2 className="text-xl font-semibold">{team!.teamName}</h2>
          <p className="text-gray-700 text-xl">{teamCurrentQuest!.questName}</p>
          {/* 진행률 */}
          <section>
            <Progress value={contributionPercentage} className="w-full h-5" />
            <p>
              {teamTotalPoints}/{teamCurrentQuest!.requiredPoints}
            </p>
          </section>
          <p className="text-gray-600 truncate">{team!.teamBio}</p>
        </div>
      </div>
    </section>
  );
};

export default MyTeam;
