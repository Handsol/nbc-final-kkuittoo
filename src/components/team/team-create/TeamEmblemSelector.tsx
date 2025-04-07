'use client';

import Title from '@/components/common/Title';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TITLE_MODE } from '@/constants/mode.constants';
import { TeamFormInputs } from '@/lib/hooks/useTeamCreateForm';
import Image from 'next/image';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';

type emblemOptions = {
  id: string;
  src: string;
}[];

type TeamEmblemSelectorProps = {
  emblemOptions: emblemOptions;
  register: UseFormRegister<TeamFormInputs>;
  watch: UseFormWatch<TeamFormInputs>;
  errors: FieldErrors<TeamFormInputs> | undefined;
};

const TeamEmblemSelector = ({
  emblemOptions,
  register,
  watch,
  errors,
}: TeamEmblemSelectorProps) => {
  const selectedEmblem = watch('emblem');

  return (
    <section>
      <Title mode={TITLE_MODE.SECTION_SUBTITLE}>TEAM EMBLEM</Title>
      <div className="flex gap-4">
        {emblemOptions.map((emblem) => (
          <label key={emblem.id}>
            <input
              type="radio"
              value={emblem.id}
              {...register('emblem', { required: true })}
              className="sr-only"
            />
            <Image
              src={emblem.src}
              alt={emblem.id}
              width={80}
              height={80}
              className={`border-2 ${
                selectedEmblem === emblem.id
                  ? 'border-black'
                  : 'border-transparent'
              } cursor-pointer`}
            />
          </label>
        ))}
      </div>
      <p>{errors && TEAMS_MESSAGES.TEAM_EMBLEM_BLANK}</p>
    </section>
  );
};

export default TeamEmblemSelector;
