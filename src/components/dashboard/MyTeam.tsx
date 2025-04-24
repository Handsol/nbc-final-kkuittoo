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
      {/* 데스크탑 버전 */}
      <div className="hidden md:flex py-[24px] pl-[40px] items-center gap-6">
        {/* 퀘스트 이미지 */}
        <Image
          src={questImage}
          alt={`${teamName} teamQuest`}
          width={120}
          height={120}
          className="flex-shrink-0"
        />

        <section className="flex-1 flex flex-col gap-3 justify-center min-w-0">
          <div className="w-full flex items-baseline gap-[8px]">
            <TeamTitle
              teamName={teamName}
              currentQuestName={teamCurrentQuest.questName}
            />
            <TeamOpenNotEditMode isOpened={isOpened} />
          </div>

          <TeamProgress
            teamTotalPoints={teamTotalPoints}
            currentQuestRequired={teamCurrentQuest.requiredPoints}
          />

          <TeamBioNotEditMode teamBio={teamBio} />
        </section>

        {/* 엠블럼 이미지 */}
        <section className="w-20 flex flex-col items-center justify-center flex-shrink-0 mr-6">
          <Image src={emblem} alt="emblem" width={80} height={80} />
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Level {id}</UserTitle>
        </section>
      </div>

      {/* 모바일 버전 */}
      <div className="md:hidden w-full min-w-[375px] px-4 py-4 flex flex-col">
        <div className="flex gap-4 items-start">
          <div className="w-[120px] h-[120px] flex-shrink-0">
            <Image
              src={questImage}
              alt={`${teamName} teamQuest`}
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="w-full flex justify-between items-center mb-2 ml-4">
              <TeamOpenNotEditMode isOpened={isOpened} />
              <div className="w-[60px] h-[60px] flex-shrink-0">
                <Image
                  src={emblem}
                  alt="emblem"
                  width={60}
                  height={60}
                  className="w-full h-full object-contain pr-4"
                />
              </div>
            </div>

            <TeamTitle
              teamName={teamName}
              currentQuestName={teamCurrentQuest.questName}
            />

            <div className="mt-3">
              <TeamProgress
                teamTotalPoints={teamTotalPoints}
                currentQuestRequired={teamCurrentQuest.requiredPoints}
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <TeamBioNotEditMode teamBio={teamBio} />
        </div>
      </div>
    </article>
  );
};

export default MyTeam;
