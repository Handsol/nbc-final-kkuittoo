'use client';

import ConfirmDialog from '@/components/common/ConfirmDialog';
import { PATH } from '@/constants/path.constants';
import { useToast } from '@/hooks/use-toast';
import { fetchCreateTeamMember } from '@/lib/services/team-client.services';
import { TeamData } from '@/types/teams.type';
import { useRouter } from 'next/navigation';
import TeamJoinPrivateModal from './team-join/TeamJoinPrivateModal';

type TeamJoinProps = {
  team: TeamData;
  userId: string;
  hasTeam: boolean;
  currentMembers: number;
};

const TeamJoin = ({ team, userId, hasTeam, currentMembers }: TeamJoinProps) => {
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
    const res = await fetchCreateTeamMember(teamId);
    const data = await res.json();

    if (data) {
      toast({
        title: '팀 가입 완료!',
        description: '이제 함께 모험을 떠나볼까요?',
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
