import {
  fetchGetCurrentTeamQuest,
  fetchGetTeamTotalPoints,
  fetchTeamData,
} from '@/lib/services/team-actions.services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/utils/auth';
import TeamBioNotEditMode from './team-edit/TeamBioNotEditMode';
import TeamImage from './TeamImage';
import TeamTitle from './TeamTitle';
import TeamOpenToggleButton from './team-edit/TeamOpenToggleButton';
import TeamOpenNotEditMode from './team-edit/TeamOpenNotEditMode';
import TeamProgress from './TeamProgress';
import TeamBioEditMode from './team-edit/TeamBioEditMode';
import Text from '../common/Text';

type TeamQuestProps = {
  id: string;
};

const TeamInfo = async ({ id }: TeamQuestProps) => {
  // 팀 기본 데이터
  const teamData = await fetchTeamData(id);
  // 팀의 전체 포인트와 현재 퀘스트를 가져오는 로직
  const { teamTotalPoints } = await fetchGetTeamTotalPoints(id);
  const teamCurrentQuest = await fetchGetCurrentTeamQuest(teamTotalPoints);
  // 현재 로그인한 유저 정보
  const session = await getServerSession(authOptions);

  // teamData & session 로딩 실패시 early return 로직
  // 이 부분은 오류 처리 로직에 대해 논의 후 수정 예정입니다.
  if (!teamData || !teamCurrentQuest) {
    return <Text>데이터를 가져오는데 실패했습니다</Text>;
  }
  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <Text className="text-lg">로그인이 필요합니다.</Text>
      </div>
    );
  }

  // 팀 생성자 여부 판단
  const userId = session.user.id;
  const isOwner = teamData.ownerId === userId;

  const { teamName, teamBio, emblem, isOpened, id: teamId } = teamData;

  return (
    <article className="w-full flex bg-neutral-400 rounded-3xl p-9 gap-5">
      {/* 팀 이미지 : 퀘스트 이미지 + 엠블럼 */}
      <TeamImage
        currentQuestImg={teamCurrentQuest.questImage}
        emblem={emblem}
      />
      <section className="flex-1 flex flex-col gap-3 justify-center relative">
        <section className="absolute right-0 top-8 flex flex-col justify-center items-center gap-3">
          {/* 팀 공개 여부 토글 버튼 */}
          {isOwner ? (
            <TeamOpenToggleButton teamId={teamId} />
          ) : (
            <TeamOpenNotEditMode isOpened={isOpened} />
          )}
        </section>
        {/* 팀 타이틀 : 팀 이름 + 팀 현재 퀘스트이름 */}
        <TeamTitle
          teamName={teamName}
          currentQuestName={teamCurrentQuest.questName}
        />
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
    </article>
  );
};

export default TeamInfo;
