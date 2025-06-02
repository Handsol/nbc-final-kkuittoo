'use client';

import { CommonLoadingSpinner } from '@/components/common/CommonLoadingSpinner';
import { Switch } from '@/components/ui/switch';
import { useTeamOpenMutation } from '@/lib/mutations/useTeamOpenMutation';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenToggleButtonProps = {
  teamId: string;
};

const TeamOpenToggleButton = ({ teamId }: TeamOpenToggleButtonProps) => {
  const { data: teamData, isPending } = useSingleTeamQuery(teamId);
  const { mutate } = useTeamOpenMutation(teamId);

  if (isPending) return <CommonLoadingSpinner size={20} />;

  // 데이터 패칭 실패 시 예외처리
  if (!teamData) throw new Error('팀 데이터 가져오기 실패');

  return (
    <div className="flex items-center gap-2">
      <label>{teamData.isOpened ? <FaLockOpen /> : <FaLock />}</label>
      <Switch
        checked={teamData.isOpened}
        onCheckedChange={(checked) => mutate(checked)}
      />
    </div>
  );
};

export default TeamOpenToggleButton;
