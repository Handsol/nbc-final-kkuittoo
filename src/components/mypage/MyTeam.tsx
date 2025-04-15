import { TeamData, TeamQuest } from '@/types/teams.type';
import TeamProgress from '../team/TeamProgress';
import TeamTitle from '../team/TeamTitle';
import TeamBioNotEditMode from '../team/team-edit/TeamBioNotEditMode';
import Image from 'next/image';
import TeamOpenNotEditMode from '../team/team-edit/TeamOpenNotEditMode';
import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';

type MyTeamProps = {
  team: TeamData;
  teamTotalPoints: number;
  teamCurrentQuest: TeamQuest;
};

const MyTeam = ({ team, teamTotalPoints, teamCurrentQuest }: MyTeamProps) => {
  const { teamName, teamBio, emblem, isOpened } = team;
  const { id, questImage } = teamCurrentQuest;

  return (
    <article className="relative w-full p-6 flex items-center gap-6 bg-sub-light">
      {/* 퀘스트 이미지 */}
      <Image
        src={questImage}
        alt={`${teamName} teamQuest`}
        width={120}
        height={120}
      />
      <section className="w-[380px] flex flex-col gap-3 justify-center relative">
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
        {/* 팀 소개 */}
        <TeamBioNotEditMode teamBio={teamBio} />
      </section>
      {/* 엠블럼 이미지 */}
      <section className="absolute w-20 flex flex-col items-center justify-center right-6">
        <Image src={emblem} alt="emblem" width={80} height={80} />
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Level {id}</UserTitle>
      </section>
    </article>
  );
};

export default MyTeam;
