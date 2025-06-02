'use client';

import { CommonLoadingSpinner } from '@/components/common/CommonLoadingSpinner';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenNotEditModeProps = {
  teamId: string;
};

const TeamOpenNotEditMode = ({ teamId }: TeamOpenNotEditModeProps) => {
  const { data: teamData, isPending } = useSingleTeamQuery(teamId);
  if (isPending) return <CommonLoadingSpinner size={20} />;

  // 데이터 패칭 실패 시 예외처리
  if (!teamData) throw new Error('팀 데이터 가져오기 실패');

  return (
    <div className="flex items-center gap-2">
      {teamData.isOpened ? <FaLockOpen /> : <FaLock />}
    </div>
  );
};

export default TeamOpenNotEditMode;
