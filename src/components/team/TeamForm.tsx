'use client';

import Title from '@/components/common/Title';
import { ACTIONBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import {
  TeamFormInputs,
  useTeamCreateForm,
} from '@/lib/hooks/useTeamCreateForm';
import { useTeamCreateContents } from '@/lib/hooks/useTeamCreateContents';
import { fetchCreateNewTeam } from '@/lib/services/team-client.services';
import { useToast } from '@/lib/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { handleCloseModalWithSuccess } from '@/lib/utils/modal.utils';
import TeamInputs from './team-create/TeamInputs';
import TeamSizeSelector from './team-create/TeamSizeSelector';
import TeamEmblemSelector from './team-create/TeamEmblemSelector';
import TeamOpenToggle from './team-create/TeamOpenToggle';
import ActionButton from '../common/button/ActionButton';
import { TEAM_TOAST_MESSAGES } from '@/constants/toast-messages.contants';

const TeamForm = () => {
  //router
  const router = useRouter();
  //toast
  const { toast } = useToast();
  // react-hook-form
  const { register, handleSubmit, errors, watch, control } =
    useTeamCreateForm();
  // input 콘텐츠 : name, bio, emblem
  const { teamFormContents, emblemOptions } = useTeamCreateContents(errors);

  // submit 로직
  const onSubmit = async (data: TeamFormInputs) => {
    try {
      const result = await fetchCreateNewTeam(data);

      if (result) {
        toast({
          title: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_CREATE.TITLE,
          description: TEAM_TOAST_MESSAGES.SUCCESS.TEAM_CREATE.DESCRIPTION,
        });
        // 마이페이지로 다시 이동 후 새로고침
        handleCloseModalWithSuccess(router);
      } else {
        toast({
          title: TEAM_TOAST_MESSAGES.FAIL.TEAM_CREATE.TITLE,
          description:
            result.error || TEAM_TOAST_MESSAGES.FAIL.TEAM_CREATE.DESCRIPTION,
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: TEAM_TOAST_MESSAGES.ERROR.SERVER.TITLE,
        description: TEAM_TOAST_MESSAGES.ERROR.SERVER.DESCRIPTION,
        variant: 'destructive',
      });
      console.error('에러 발생:', error);
    }
  };

  return (
    <div>
      <Title mode={TITLE_MODE.SECTION_TITLE}>MAKE MY TEAM</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TeamInputs teamFormContents={teamFormContents} register={register} />
        <TeamSizeSelector register={register} />
        <TeamEmblemSelector
          emblemOptions={emblemOptions}
          register={register}
          watch={watch}
          errors={errors}
        />
        <TeamOpenToggle watch={watch} control={control} />

        <ActionButton mode={ACTIONBUTTON_MODE.PRIMARY} type="submit">
          확인
        </ActionButton>
      </form>
    </div>
  );
};

export default TeamForm;
