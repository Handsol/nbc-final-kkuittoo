'use client';

import Text from '@/components/common/Text';
import { Switch } from '@/components/ui/switch';
import { useTeamOpenMutation } from '@/lib/mutations/useTeamOpenMutation';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import { FaLock } from 'react-icons/fa6';
import { FaLockOpen } from 'react-icons/fa6';

type TeamOpenToggleButtonProps = {
  teamId: string;
};

const TeamOpenToggleButton = ({ teamId }: TeamOpenToggleButtonProps) => {
  // tanstack query - useQuery
  const { data: teamData, isPending } = useSingleTeamQuery(teamId);
  // tanstack query - useMutation
  const { mutate } = useTeamOpenMutation(teamId);

  if (isPending) return <Text>로딩 중...</Text>;

  if (!teamData) return <Text>데이터를 가져오는데 실패했습니다</Text>;

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
