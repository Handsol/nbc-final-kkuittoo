'use client';

import CommonInputBar from '@/components/common/CommonInputBar';
import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import { TeamFormContents } from '@/lib/hooks/useTeamCreateContents';
import { TeamFormInputs } from '@/lib/hooks/useTeamCreateForm';
import { UseFormRegister } from 'react-hook-form';

type TeamInputsProps = {
  teamFormContents: TeamFormContents;
  register: UseFormRegister<TeamFormInputs>;
};

const TeamInputs = ({ teamFormContents, register }: TeamInputsProps) => {
  return (
    <section>
      {teamFormContents.map((item) => {
        const {
          title,
          id,
          name,
          type,
          placeholder,
          required,
          minLength,
          maxLength,
          error,
        } = item;
        return (
          <section key={id}>
            <label htmlFor={name}>
              <Title mode={TITLE_MODE.SECTION_SUBTITLE}>{title}</Title>
              <CommonInputBar
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(name as 'teamName' | 'teamBio', {
                  required,
                  minLength,
                  maxLength,
                })}
              />
            </label>
            <p>{error?.message && error.message}</p>
          </section>
        );
      })}
    </section>
  );
};

export default TeamInputs;
