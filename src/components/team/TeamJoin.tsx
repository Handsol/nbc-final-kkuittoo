'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { useToast } from '@/lib/hooks/use-toast';
import { fetchCreateTeamMember } from '@/lib/services/team-client.services';
import { useRouter } from 'next/navigation';
import TeamJoinPrivateModal from './team-join/TeamJoinPrivateModal';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { TeamWithPoints } from '@/types/rank.type';

type TeamJoinProps = {
  team: TeamWithPoints;
  hasTeam: boolean;
  currentMembers: number;
};

/**
 * 팀 가입 버튼 컴포넌트
 * 1. 공개 팀 : ConfirmDialog로 확인/취소 버튼 모달로 가입
 * 2. 비공개 팀 : 비밀번호 입력 Form이 등장, 비밀번호 유효검증 로직 통과 후 가입
 *
 * 데이터 fetch 로직 위치
 *   서버 컴포넌트 : team-actions.services.ts
 *   클라이언트 컴포넌트 : team-client.services.ts
 * @param team {TeamData} : 카드에 해당하는 팀의 모든 정보
 *        서버 => fetchGetTeamData(teamId)
 *        클라 => fetchGetSingleTeam(teamId)
 * @param hasTeam {boolean} : 해당 유저가 가입한 팀이 있는지 여부
 *        서버 => fetchGetMyTeamData(userId)
 *        클라 => !로직 구현해야함
 * @param currentMembers {number} : 카드에 해당하는 팀의 멤버 수
 *        서버 => fetchGetMyTeamMemberData(teamId)
 *        클라 => fetchGetSingleTeam(teamId)
 *                          (여기에 멤버 데이터도 있음)
 * @returns
 */

const TeamJoin = ({ team, hasTeam, currentMembers }: TeamJoinProps) => {
  // toast + router
  const { toast } = useToast();
  const router = useRouter();

  // team 정보
  const { id: teamId, teamName, isOpened, maxTeamSize } = team;

  // 공개 팀 가입 로직
  const joinContents = {
    uiButtonText: 'JOIN',
    title: 'JOIN THIS TEAM',
    description: `${teamName}의 팀원들과 함께 모험을 떠나시겠습니까?`,
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleJoinOpenTeam = async () => {
    const data = await fetchCreateTeamMember(teamId);

    if (data) {
      toast({
        title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_JOIN.TITLE,
        description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_JOIN.DESCRIPTION,
      });

      // 팀 페이지로 이동
      router.push(`${PATH.TEAM}/${teamId}`);
    }
  };

  // 해당 유저가 소속 팀이 있는 경우 아무것도 렌더링하지 않음
  if (hasTeam) return null;

  // 해당 팀의 최대 인원이 찼을 때 아무것도 렌더링하지 않음
  if (maxTeamSize <= currentMembers) return null;

  return (
    <>
      {isOpened ? (
        <ConfirmDialog contents={joinContents} onClick={handleJoinOpenTeam} />
      ) : (
        <TeamJoinPrivateModal teamId={teamId} />
      )}
    </>
  );
};

export default TeamJoin;
