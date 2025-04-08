'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* 화면에서 보여지는 팀 탈퇴 버튼 */}
        <button>팀 탈퇴</button>
      </AlertDialogTrigger>
      {/* 모달창 */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>정말로 탈퇴하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            탈퇴 시 기여도는 모두 사라집니다. 계속하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleLeaveBtnClick}>
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default TeamLeaveButton;
