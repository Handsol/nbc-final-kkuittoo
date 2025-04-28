'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { TOOLTIP_MESSAGE } from '@/constants/tooltip-message.constants';
import { useToast } from '@/lib/hooks/use-toast';
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
    uiButtonText: '팀 해체하기',
    title: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_DISBAND.TITLE,
    description: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_DISBAND.DESCRIPTION,
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleDisbandBtnClick = async () => {
    if (membersExceptTeamOwner) {
      toast({
        title: TEAM_TOAST_MESSAGES.FAIL.TEAM_DISBAND.TITLE,
        description: TEAM_TOAST_MESSAGES.FAIL.TEAM_DISBAND.DESCRIPTION,
        variant: 'destructive',
      });
      return;
    }

    try {
      const data = await fetchDeleteTeam(teamId);
      if (data) {
        toast({
          title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_DISBAND.TITLE,
          description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_DISBAND.DESCRIPTION,
        });
        // 캐시 갱신 및 리다이렉트
        router.push(PATH.RANK.TEAMS);
        router.refresh(); //캐시 갱신
      }
    } catch (error) {
      console.error('팀 해체 중 오류 발생:', error);
    }
  };

  return (
    <ConfirmDialog
      contents={disbandContents}
      onClick={handleDisbandBtnClick}
      tooltipMessage={TOOLTIP_MESSAGE.TEAM.DISBAND}
    />
  );
};

export default TeamDisbandButton;
