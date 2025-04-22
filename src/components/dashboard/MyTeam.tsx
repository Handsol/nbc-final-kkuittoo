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
    <article className="relative w-full bg-sub-light">
      {/* 데스크탑 버전  */}
      <div className="hidden md:flex relative py-[24px] pl-[40px] items-center gap-6">
        {/* 퀘스트 이미지 */}
        <Image
          src={questImage}
          alt={`${teamName} teamQuest`}
          width={120}
          height={120}
        />

        <section className="w-[380px] flex flex-col gap-3 justify-center">
          <div className="w-full flex items-baseline gap-[8px]">
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
        <section className="absolute w-20 flex flex-col items-center justify-center right-[60px]">
          <Image src={emblem} alt="emblem" width={80} height={80} />
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Level {id}</UserTitle>
        </section>
      </div>

      {/* 모바일 버전*/}
      <div className="md:hidden w-full min-w-[375px] px-4 py-4 flex flex-col box-border overflow-hidden">
        {/* 상단 */}
        <div className="flex gap-4 items-start">
          {/* 왼쪽 */}
          <div className="w-[120px] h-[120px] flex-shrink-0">
            <Image
              src={questImage}
              alt={`${teamName} teamQuest`}
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>

          {/* 오른쪽  */}
          <div className="flex-1 flex flex-col">
            {/* 팀 타이틀 + 공개 여부 + 앰블럼 */}
            <div className="flex justify-between items-start">
              <div className="w-full flex items-baseline gap-[8px]">
                <TeamTitle
                  teamName={teamName}
                  currentQuestName={teamCurrentQuest.questName}
                />
                <TeamOpenNotEditMode isOpened={isOpened} />
              </div>
              <div className="flex items-center gap-[8px]">
                <div className="w-[50px] h-[50px]">
                  <Image
                    src={emblem}
                    alt="emblem"
                    width={50}
                    height={50}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* 프로그래스 바 */}
            <div className="mt-3">
              <TeamProgress
                teamTotalPoints={teamTotalPoints}
                currentQuestRequired={teamCurrentQuest.requiredPoints}
              />
            </div>
          </div>
        </div>

        {/* 하단 (팀 소개) */}
        <div className="mt-4">
          <TeamBioNotEditMode teamBio={teamBio} />
        </div>
      </div>
    </article>
  );
};

export default MyTeam;
