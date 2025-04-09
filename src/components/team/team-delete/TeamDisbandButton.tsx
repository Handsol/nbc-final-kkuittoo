'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { useToast } from '@/hooks/use-toast';
import { fetchDeleteTeam } from '@/lib/services/team-client.services';
import { TeamMemberData } from '@/types/teams.type';
import { useRouter } from 'next/navigation';

type TeamDisbandButtonProps = {
  teamId: string;
  ownerId: string;
  memberList: TeamMemberData[];
};

const TeamDisbandButton = ({
  teamId,
  ownerId,
  memberList,
}: TeamDisbandButtonProps) => {
  // toast
  const { toast } = useToast();
  // route
  const router = useRouter();
  // 다른 팀원 있는지 여부 판단
  const membersExceptTeamOwner = memberList.some(
    (member) => member.userId !== ownerId,
  );

  // confirmDialog에 들어갈 컨텐츠
  const disbandContents = {
    uiButtonText: 'DISBAND',
    title: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_DISBAND.TITLE,
    description: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_DISBAND.DESCRIPTION,
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleDisbandBtnClick = async () => {
    // 팀장 외 다른 팀원이 있는 경우 예외처리
    if (membersExceptTeamOwner) {
      toast({
        title: TEAM_TOAST_MESSAGES.FAIL.TEAM_DISBAND.TITLE,
        description: TEAM_TOAST_MESSAGES.FAIL.TEAM_DISBAND.DESCRIPTION,
        variant: 'destructive',
      });

      return;
    }

    const data = await fetchDeleteTeam(teamId);

    if (data) {
      toast({
        title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_DISBAND.TITLE,
        description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_DISBAND.DESCRIPTION,
      });

      // 팀 랭킹 페이지로 이동
      router.push(PATH.RANK.TEAMS);
    }
  };

  return (
    <ConfirmDialog contents={disbandContents} onClick={handleDisbandBtnClick} />
  );
};

export default TeamDisbandButton;
