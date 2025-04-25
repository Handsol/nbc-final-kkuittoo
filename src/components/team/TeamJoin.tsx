'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { useToast } from '@/lib/hooks/use-toast';
import { useRouter } from 'next/navigation';
import TeamJoinPrivateModal from './team-join/TeamJoinPrivateModal';
import { TeamWithPoints } from '@/types/rank.type';
import { useSession } from 'next-auth/react';
import { fetchJoinTeam } from '@/lib/services/team-actions.services';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { useQueryClient } from '@tanstack/react-query';
import { TeamData } from '@/types/teams.type';

type TeamJoinProps = {
  team: TeamWithPoints | TeamData;
  hasTeam: boolean;
  currentMembers: number;
  mode?: string;
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

const TeamJoin = ({ team, hasTeam, currentMembers, mode }: TeamJoinProps) => {
  // toast + router
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // team 정보
  const { id: teamId, teamName, isOpened, maxTeamSize } = team;

  // 공개 팀 가입 로직
  const joinContents = {
    uiButtonText: '가입하기',
    title: '공개 팀 가입하기',
    description: `${teamName}의 팀원들과 함께 모험을 떠나시겠습니까?`,
    cancelButtonText: '취소',
    confirmButtonText: '가입',
  };

  const handleJoinOpenTeam = async () => {
    const userId = session?.user.id;
    if (!userId) return;

    try {
      const result = await fetchJoinTeam(teamId, userId);
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ['myTeam'] });
        toast({
          title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_JOIN.TITLE,
          description:
            TEAM_TOAST_MESSAGES.SUCCESS.TEAM_JOIN.DESCRIPTION(teamName),
        });
        router.refresh(); // 캐시 갱신
        router.push(`${PATH.TEAM}/${teamId}`);
      } else {
        toast({
          title: TEAM_TOAST_MESSAGES.FAIL.TEAM_JOIN.TITLE,
          description: TEAM_TOAST_MESSAGES.FAIL.TEAM_JOIN.DESCRIPTION(
            result.error,
          ),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: TEAM_TOAST_MESSAGES.FAIL.TEAM_JOIN.TITLE,
        description: TEAM_TOAST_MESSAGES.FAIL.TEAM_JOIN.DESCRIPTION(),
        variant: 'destructive',
      });
    }
  };

  // 해당 유저가 소속 팀이 있는 경우 아무것도 렌더링하지 않음
  if (hasTeam) return null;

  // 해당 팀의 최대 인원이 찼을 때 아무것도 렌더링하지 않음
  if (maxTeamSize <= currentMembers) return null;

  return (
    <>
      {isOpened ? (
        <ConfirmDialog
          contents={joinContents}
          onClick={handleJoinOpenTeam}
          mode={mode}
        />
      ) : (
        <TeamJoinPrivateModal teamId={teamId} mode={mode} />
      )}
    </>
  );
};

export default TeamJoin;
