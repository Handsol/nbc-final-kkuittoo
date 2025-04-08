'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { API_PATH, PATH } from '@/constants/path.constants';
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
    title: '정말로 해체하시겠습니까?',
    description: '해체 시 기여도는 모두 사라집니다. 계속하시겠습니까?',
    cancelButtonText: 'NO',
    confirmButtonText: 'YES',
  };

  const handleDisbandBtnClick = async () => {
    // 팀장 외 다른 팀원이 있는 경우 예외처리
    if (membersExceptTeamOwner) {
      toast({
        title: '남은 팀원이 있어요!',
        description: '팀장을 제외한 다른 멤버가 없을 때, 해체가 가능해요!',
        variant: 'destructive',
      });

      return;
    }

    const res = await fetchDeleteTeam(teamId);
    const data = await res.json();

    if (data) {
      toast({
        title: '팀 해체 완료!',
        description: '이제 새로운 팀을 찾아볼까요?',
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
