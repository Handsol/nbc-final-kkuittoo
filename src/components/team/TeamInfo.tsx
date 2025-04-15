import {
  fetchGetTeamData,
  fetchGetTeamTotalPoints,
} from '@/lib/services/team-actions.services';
import TeamBioNotEditMode from './team-edit/TeamBioNotEditMode';
import TeamTitle from './TeamTitle';
import TeamOpenToggleButton from './team-edit/TeamOpenToggleButton';
import TeamOpenNotEditMode from './team-edit/TeamOpenNotEditMode';
import TeamProgress from './TeamProgress';
import TeamBioEditMode from './team-edit/TeamBioEditMode';
import Text from '../common/Text';
import Image from 'next/image';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';
import UnauthorizedPage from '../loading-error-page/UnauthorizedPage';
import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';

type TeamQuestProps = {
  id: string;
};

const TeamInfo = async ({ id }: TeamQuestProps) => {
  // 팀 기본 데이터
  const teamData = await fetchGetTeamData(id);
  // 팀의 전체 포인트와 현재 퀘스트를 가져오는 로직
  const { teamTotalPoints } = await fetchGetTeamTotalPoints(id);
  const teamCurrentQuest = getCurrentTeamQuest(teamTotalPoints);
  // 현재 로그인한 유저 정보
  const session = await getUserSession();

  //세션이 없을 경우 로그인 필요페이지로 return
  if (!session) {
    return <UnauthorizedPage />;
  }

  // 팀 생성자 여부 판단
  const userId = session.user.id;
  const isOwner = teamData.ownerId === userId;

  const { teamName, teamBio, emblem, isOpened, id: teamId } = teamData;

  return (
    <article className="relative w-full p-6 flex items-center gap-6 bg-sub-light">
      {/* 퀘스트 이미지 */}
      <Image
        src={teamCurrentQuest.questImage}
        alt="teamQuest"
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
          {isOwner ? (
            <TeamOpenToggleButton teamId={teamId} />
          ) : (
            <TeamOpenNotEditMode isOpened={isOpened} />
          )}
        </div>
        {/* 팀 progress : progress bar + 숫자 */}
        <TeamProgress
          teamTotalPoints={teamTotalPoints}
          currentQuestRequired={teamCurrentQuest.requiredPoints}
        />
        {/* 팀 소개 : 생성자이면 수정버튼 활성화 */}
        {isOwner ? (
          <TeamBioEditMode teamBio={teamBio} teamId={id} />
        ) : (
          <TeamBioNotEditMode teamBio={teamBio} />
        )}
      </section>
      {/* 엠블럼 이미지 */}
      <section className="absolute w-20 flex flex-col items-center justify-center right-6">
        <Image src={emblem} alt="emblem" width={80} height={80} />
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Level {3}</UserTitle>
      </section>
    </article>
  );
};

export default TeamInfo;
