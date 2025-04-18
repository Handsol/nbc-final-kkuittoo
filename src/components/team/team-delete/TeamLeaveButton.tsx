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
    try {
      const data = await fetchDeleteMyTeamMember(id);
      if (data) {
        toast({
          title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_LEAVE.TITLE,
          description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_LEAVE.DESCRIPTION,
        });
        // 캐시 갱신 및 리다이렉트
        router.push(PATH.RANK.TEAMS);
        router.refresh(); // 클라이언트 캐시 갱신
      }
    } catch (error) {
      toast({
        title: '팀 탈퇴 실패',
        description: '팀 탈퇴 중 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <ConfirmDialog contents={leaveContents} onClick={handleLeaveBtnClick} />
  );
};

export default TeamLeaveButton;
