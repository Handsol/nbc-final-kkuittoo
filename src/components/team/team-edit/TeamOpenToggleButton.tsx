'use client';

import { CommonLoadingSpinner } from '@/components/common/CommonLoadingSpinner';
import Text from '@/components/common/Text';
import ErrorPageText from '@/components/loading-error-page/ErrorPageText';
import { Switch } from '@/components/ui/switch';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import { PATH } from '@/constants/path.constants';
import { useTeamOpenMutation } from '@/lib/mutations/useTeamOpenMutation';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import Image from 'next/image';
import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenToggleButtonProps = {
  teamId: string;
};

const TeamOpenToggleButton = ({ teamId }: TeamOpenToggleButtonProps) => {
  const TeamErrorContents = {
    title: 'ERROR',
    text: '문제가 발생했어요. 잠시 후에 다시 도전해볼까요?',
    href: `${PATH.TEAM}/${teamId}`,
    linkButtonText: '팀 페이지로 돌아가기',
  };

  // tanstack query - useQuery
  const { data: teamData, isPending } = useSingleTeamQuery(teamId);
  // tanstack query - useMutation
  const { mutate } = useTeamOpenMutation(teamId);

  if (isPending) return <CommonLoadingSpinner size={20} />;

  // 데이터 페칭 실패 시 예외처리
  if (!teamData) throw new Error('팀 데이터 가져오기 실패');

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={teamData.isOpened}
        onCheckedChange={(checked) => mutate(checked)}
      />
      <label>{teamData.isOpened ? <FaLockOpen /> : <FaLock />}</label>
    </div>
  );
};

export default TeamOpenToggleButton;
