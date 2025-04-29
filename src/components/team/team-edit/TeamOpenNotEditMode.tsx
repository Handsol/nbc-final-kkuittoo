'use client';

import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenNotEditModeProps = {
  teamId: string;
};

const TeamOpenNotEditMode = ({ teamId }: TeamOpenNotEditModeProps) => {
  // tanstack query - useQuery
  const { data: teamData } = useSingleTeamQuery(teamId);
  return (
    <div className="flex items-center gap-2">
      {teamData.isOpened ? <FaLockOpen /> : <FaLock />}
    </div>
  );
};

export default TeamOpenNotEditMode;
