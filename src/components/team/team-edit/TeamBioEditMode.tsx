'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTeamBioMutation } from '@/lib/mutations/useTeamBioMutation';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import CommonInputBar from '../../common/CommonInputBar';
import Text from '@/components/common/Text';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE, ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';

type TeamBioProps = {
  teamBio: string;
  teamId: string;
};

type FormData = {
  teamBio: string;
};

const TeamBioEditMode = ({ teamBio, teamId }: TeamBioProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // react-hook-form
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      teamBio,
    },
  });

  // tanstack query - useMutation
  const { mutate, isPending: isTeamBioPending } = useTeamBioMutation(
    teamId,
    teamBio,
  );
  // tanstack query - useQuery
  const {
    data: teamData,
    isPending: isTeamDataPending,
    isError: isTeamDataError,
  } = useSingleTeamQuery(teamId);

  // form onSubmit handler
  const handleOnSubmit = (data: FormData) => {
    mutate(data);
    setIsEditMode(false);
  };

  // Edit 버튼 클릭시 mode 전환
  const handleEditBtnClick = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      {isTeamDataPending ? (
        <Text>로딩 중...</Text>
      ) : isTeamDataError || !teamData ? (
        <Text>데이터 불러오기 실패</Text>
      ) : isEditMode ? (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <CommonInputBar id="teamBio" {...register('teamBio')} />
          <ActionButton
            mode={ACTIONBUTTON_MODE.PRIMARY}
            type="submit"
            disabled={isTeamBioPending}
          >
            확인
          </ActionButton>
        </form>
      ) : (
        <>
          <Text>{teamData.teamBio}</Text>
          <IconButton
            mode={ICONBUTTON_MODE.EDIT}
            onClick={handleEditBtnClick}
          />
        </>
      )}
    </div>
  );
};

export default TeamBioEditMode;
