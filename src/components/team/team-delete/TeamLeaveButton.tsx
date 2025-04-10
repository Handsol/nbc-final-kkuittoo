'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';
import { useToast } from '@/lib/hooks/use-toast';
import { fetchDeleteMyTeamMember } from '@/lib/services/team-client.services';
import { useRouter } from 'next/navigation';

type TeamLeaveButtonProps = {
  id: string;
};

const TeamLeaveButton = ({ id }: TeamLeaveButtonProps) => {
  // toast
  const { toast } = useToast();
  // route
  const router = useRouter();

  // alert-dialog에 들어갈 컨텐츠
  const leaveContents = {
    uiButtonText: 'LEAVE',
    title: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_LEAVE.TITLE,
    description: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_LEAVE.DESCRIPTION,
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleLeaveBtnClick = async () => {
    const data = await fetchDeleteMyTeamMember(id);

    if (data) {
      toast({
        title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_LEAVE.TITLE,
        description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_LEAVE.DESCRIPTION,
      });

      // 팀 랭킹 페이지로 이동
      router.push(PATH.RANK.TEAMS);
    }
  };

  return (
    <ConfirmDialog contents={leaveContents} onClick={handleLeaveBtnClick} />
  );
};

export default TeamLeaveButton;
