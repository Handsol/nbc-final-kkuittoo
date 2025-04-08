'use client';

import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import {
  TeamFormInputs,
  useTeamCreateForm,
} from '@/lib/hooks/useTeamCreateForm';
import { useTeamCreateContents } from '@/lib/hooks/useTeamCreateContents';
import { fetchCreateNewTeam } from '@/lib/services/team-client.services';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { handleCloseModalWithSuccess } from '@/lib/utils/modal.utils';
import TeamInputs from './team-create/TeamInputs';
import TeamSizeSelector from './team-create/TeamSizeSelector';
import TeamEmblemSelector from './team-create/TeamEmblemSelector';
import TeamOpenToggle from './team-create/TeamOpenToggle';

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
      const res = await fetchCreateNewTeam(data);
      const result = await res.json();

      if (res.ok && result) {
        toast({
          title: '팀 생성 완료!',
          description: '팀이 성공적으로 생성되었습니다',
        });
        // 마이페이지로 다시 이동 후 새로고침
        handleCloseModalWithSuccess(router);
      } else {
        toast({
          title: '생성 실패',
          description: result.error || '문제가 발생했어요',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '에러 발생',
        description: '서버와 통신 중 문제가 생겼어요.',
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

        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default TeamForm;
