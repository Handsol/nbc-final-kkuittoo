import { TeamData } from '@/types/teams.type';
import { TeamQuest } from '@prisma/client';
import TeamProgress from '../team/TeamProgress';
import TeamTitle from '../team/TeamTitle';
import TeamBioNotEditMode from '../team/team-edit/TeamBioNotEditMode';
import Image from 'next/image';
import TeamOpenNotEditMode from '../team/team-edit/TeamOpenNotEditMode';

type MyTeamProps = {
  team: TeamData;
  teamTotalPoints: number;
  teamCurrentQuest: TeamQuest;
};

const MyTeam = ({ team, teamTotalPoints, teamCurrentQuest }: MyTeamProps) => {
  const { id, teamName, teamBio, emblem, isOpened } = team;
  const { questName, requiredPoints, questImage } = teamCurrentQuest;

  return (
    <article className="w-full h-[250px] flex bg-sub rounded-3xl p-9 gap-5 items-center">
      {/* 퀘스트 이미지 */}
      <Image
        src={questImage}
        alt="teamQuest"
        width={120}
        height={120}
        className="bg-neutral-500 rounded-3xl"
      />
      <section className="flex-1 flex flex-col gap-3 justify-center relative">
        <div className="w-full flex justify-between items-start gap-10">
          {/* 팀 타이틀 : 팀 이름 + 팀 현재 퀘스트이름 */}
          <TeamTitle
            teamName={teamName}
            currentQuestName={teamCurrentQuest.questName}
          />
          {/* 팀 공개 여부 토글 버튼 */}
          <TeamOpenNotEditMode isOpened={isOpened} />
        </div>
        {/* 팀 progress : progress bar + 숫자 */}
        <TeamProgress
          teamTotalPoints={teamTotalPoints}
          currentQuestRequired={teamCurrentQuest.requiredPoints}
        />
        {/* 팀 소개 : 생성자이면 수정버튼 활성화 */}
        <TeamBioNotEditMode teamBio={teamBio} />
      </section>
      {/* 엠블럼 이미지 */}
      <section className="relative w-20 flex items-center justify-center">
        <Image
          src={emblem}
          alt="emblem"
          width={60}
          height={60}
          className="rounded-full bg-neutral-700 absolute"
        />
      </section>
    </article>
  );
};

export default MyTeam;
