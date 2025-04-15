'use client';

import CommonInputBar from '@/components/common/CommonInputBar';
import ErrorMessage from '@/components/common/ErrorMessage';
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
    <>
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
          <section key={id} className="w-full">
            <label
              htmlFor={name}
              className="flex gap-6 justify-between items-center"
            >
              <Title mode={TITLE_MODE.SECTION_SUBTITLE}>{title}</Title>
              <div className="flex-1">
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
              </div>
            </label>
            <ErrorMessage>{error?.message && error.message}</ErrorMessage>
          </section>
        );
      })}
    </>
  );
};

export default TeamInputs;
