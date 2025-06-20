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
import Image from 'next/image';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';
import UnauthorizedPage from '../loading-error-page/UnauthorizedPage';
import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';

type TeamQuestProps = {
  id: string;
  editMode?: boolean;
};

const TeamInfo = async ({ id, editMode = true }: TeamQuestProps) => {
  // 팀 기본 데이터
  const teamData = await fetchGetTeamData(id);
  // 팀의 전체 포인트와 현재 퀘스트를 가져오는 로직
  const { teamTotalPoints } = await fetchGetTeamTotalPoints(id);
  const teamCurrentQuest = getCurrentTeamQuest(teamTotalPoints);

  // 현재 로그인한 유저 정보
  const session = await getUserSession();
  if (!session) {
    return <UnauthorizedPage />;
  }

  // 팀 생성자 여부 판단
  const userId = session.user.id;
  const isOwner = teamData.ownerId === userId;
  // editMode가 false이면 수정 불가능하도록 변경
  const canEdit = editMode && isOwner;

  const { teamName, teamBio, emblem, id: teamId } = teamData;

  return (
    <article className="relative w-full bg-sub-light">
      {/* 데스크탑 버전 */}
      <div className="hidden md:flex relative py-6 pl-10 items-center gap-6">
        {/* 퀘스트 이미지 */}
        <Image
          src={teamCurrentQuest.questImage}
          alt={`${teamName} teamQuest`}
          width={120}
          height={120}
          className="flex-shrink-0"
        />

        <section className="flex-1 flex flex-col gap-3 justify-center min-w-0">
          <div className="w-[260px] flex items-start justify-start gap-2">
            <TeamTitle
              teamName={teamName}
              currentQuestName={teamCurrentQuest.questName}
            />
            {canEdit ? (
              <TeamOpenToggleButton teamId={teamId} />
            ) : (
              <TeamOpenNotEditMode teamId={teamId} />
            )}
          </div>

          <TeamProgress
            teamTotalPoints={teamTotalPoints}
            currentQuestRequired={teamCurrentQuest.requiredPoints}
          />

          {canEdit ? (
            <TeamBioEditMode teamBio={teamBio} teamId={id} />
          ) : (
            <TeamBioNotEditMode teamBio={teamBio} />
          )}
        </section>

        {/* 엠블럼 이미지 */}
        <section className="w-20 flex flex-col items-center justify-center flex-shrink-0 mr-6">
          <Image src={emblem} alt="emblem" width={80} height={80} />
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            Level {teamCurrentQuest.id}
          </UserTitle>
        </section>
      </div>

      {/* 모바일 버전 */}
      <div className="md:hidden w-full min-w-[344px] px-4 py-4 flex flex-col">
        <div className="flex gap-4 items-start">
          <div className="w-[120px] h-[120px] flex-shrink-0">
            <Image
              src={teamCurrentQuest.questImage}
              alt={`${teamName} teamQuest`}
              width={120}
              height={120}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            {/* 토글 버튼 + 엠블럼*/}
            <div className="w-full flex justify-between items-center ml-4">
              <div>
                {canEdit ? (
                  <TeamOpenToggleButton teamId={teamId} />
                ) : (
                  <TeamOpenNotEditMode teamId={teamId} />
                )}
              </div>
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

            {/* 팀 타이틀 */}
            <TeamTitle
              teamName={teamName}
              currentQuestName={teamCurrentQuest.questName}
            />
          </div>
        </div>

        {/* 프로그래스 바 */}
        <div className="mt-3">
          <TeamProgress
            teamTotalPoints={teamTotalPoints}
            currentQuestRequired={teamCurrentQuest.requiredPoints}
          />
        </div>

        {/* 팀 소개 */}
        {canEdit ? (
          <TeamBioEditMode teamBio={teamBio} teamId={id} />
        ) : (
          <TeamBioNotEditMode teamBio={teamBio} />
        )}
      </div>
    </article>
  );
};

export default TeamInfo;
