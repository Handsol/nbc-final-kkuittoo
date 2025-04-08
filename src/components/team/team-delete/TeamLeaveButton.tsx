'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { useToast } from '@/hooks/use-toast';
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
    title: '정말로 탈퇴하시겠습니까?',
    description: '탈퇴 시 기여도는 모두 사라집니다. 계속하시겠습니까?',
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleLeaveBtnClick = async () => {
    const res = await fetchDeleteMyTeamMember(id);
    const data = await res.json();

    if (data) {
      toast({
        title: '팀 탈퇴 완료!',
        description: '이제 새로운 팀을 찾아볼까요?',
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
