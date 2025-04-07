'use client';

import Title from '@/components/common/Title';
import { Switch } from '@/components/ui/switch';
import { TITLE_MODE } from '@/constants/mode.constants';
import { TeamFormInputs } from '@/lib/hooks/useTeamCreateForm';
import { Control, Controller, UseFormWatch } from 'react-hook-form';

type TeamOpenToggleProps = {
  watch: UseFormWatch<TeamFormInputs>;
  control: Control<TeamFormInputs, any, TeamFormInputs>;
};

const TeamOpenToggle = ({ watch, control }: TeamOpenToggleProps) => {
  const isOpened = watch('isOpened');

  return (
    <div>
      <Controller
        name="isOpened"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <div className="flex items-center gap-4">
            <Title mode={TITLE_MODE.SECTION_SUBTITLE}>
              {isOpened ? 'OPEN' : 'PRIVATE'}
            </Title>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              id="isOpened"
            />
          </div>
        )}
      />
    </div>
  );
};

export default TeamOpenToggle;
