'use client';

import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import { TeamFormInputs } from '@/lib/hooks/useTeamCreateForm';
import { UseFormRegister } from 'react-hook-form';

type TeamSizeSelectProps = {
  register: UseFormRegister<TeamFormInputs>;
};

const TeamSizeSelector = ({ register }: TeamSizeSelectProps) => {
  return (
    <section>
      <label htmlFor="maxTeamSize">
        <Title mode={TITLE_MODE.SECTION_SUBTITLE}>MEMBERS</Title>
        <select
          id="maxTeamSize"
          {...register('maxTeamSize', { required: true })}
        >
          <option defaultValue="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </label>
    </section>
  );
};

export default TeamSizeSelector;
