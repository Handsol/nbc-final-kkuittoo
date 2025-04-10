import { TeamData } from '@/types/teams.type';
import { TeamQuest } from '@prisma/client';
import TeamProgress from '../team/TeamProgress';
import TeamTitle from '../team/TeamTitle';
import TeamBioNotEditMode from '../team/team-edit/TeamBioNotEditMode';
import TeamImage from '../team/TeamImage';
import LinkButton from '../common/button/LinkButton';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import Title from '../common/Title';

type MyTeamProps = {
  team: TeamData;
  teamTotalPoints: number;
  teamCurrentQuest: TeamQuest;
};

const MyTeam = ({ team, teamTotalPoints, teamCurrentQuest }: MyTeamProps) => {
  const { id, teamName, teamBio, emblem } = team;
  const { questName, requiredPoints, questImage } = teamCurrentQuest;

  return (
    <section className="h-full w-[680px] bg-gray-300 p-6 rounded-3xl flex flex-col">
      {/* 제목 */}
      <Title mode={TITLE_MODE.SECTION_TITLE} className="text-xl font-bold mb-4">
        MY TEAM
      </Title>
      {/* 메인 영역 */}
      <article className="w-full max-w-5xl flex flex-row gap-4">
        {/* 팀 이미지 */}
        <TeamImage currentQuestImg={questImage} emblem={emblem} />
        <div className="w-3/5 flex flex-col gap-3 text-sm">
          {/* 팀 정보  */}
          <TeamTitle teamName={teamName} currentQuestName={questName} />
          {/* 진행률 */}
          <TeamProgress
            teamTotalPoints={teamTotalPoints}
            currentQuestRequired={requiredPoints}
          />
          {/* 팀 소개 */}
          <TeamBioNotEditMode teamBio={teamBio} />
          {/* 팀 바로가기 버튼 */}
          <LinkButton mode={LINKBUTTON_MODE.COMMON} href={`${PATH.TEAM}/${id}`}>
            팀으로 바로가기
          </LinkButton>
        </div>
      </article>
    </section>
  );
};

export default MyTeam;
