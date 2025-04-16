'use client';

import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import { TeamFormInputs } from '@/lib/hooks/useTeamCreateForm';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import ErrorMessage from '@/components/common/ErrorMessage';

type TeamSizeSelectProps = {
  control: Control<TeamFormInputs, any, TeamFormInputs>;
  errors?: FieldErrors<TeamFormInputs>;
};

const TeamSizeSelector = ({ control, errors }: TeamSizeSelectProps) => {
  return (
    <section className="w-full">
      <label htmlFor="maxTeamSize" className="flex w-full justify-between mb-5">
        <Title mode={TITLE_MODE.SECTION_SUBTITLE}>멤버 수</Title>
        <div className="flex flex-col items-end">
          <Controller
            name="maxTeamSize"
            control={control}
            rules={{
              required: {
                value: true,
                message: TEAMS_MESSAGES.TEAM_SIZE_BLANK,
              },
            }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </label>
    </section>
  );
};

export default TeamSizeSelector;
