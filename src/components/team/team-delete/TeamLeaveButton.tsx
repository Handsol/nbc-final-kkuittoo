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
    uiButtonText: '팀 탈퇴하기',
    title: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_LEAVE.TITLE,
    description: TEAM_TOAST_MESSAGES.CONFIRM.TEAM_LEAVE.DESCRIPTION,
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleLeaveBtnClick = async () => {
    try {
      const data = await fetchDeleteMyTeamMember(id);
      if (data) {
        toast({
          title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_LEAVE.TITLE,
          description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_LEAVE.DESCRIPTION,
        });
        // 캐시 갱신 및 리다이렉트
        router.push(PATH.RANK.TEAMS);
        router.refresh(); //캐시 갱신
      }
    } catch (error) {
      console.error('팀 탈퇴 중 오류 발생:', error);
    }
  };

  return (
    <ConfirmDialog contents={leaveContents} onClick={handleLeaveBtnClick} />
  );
};

export default TeamLeaveButton;
