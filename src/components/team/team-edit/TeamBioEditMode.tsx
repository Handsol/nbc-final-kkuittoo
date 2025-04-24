'use client';

import { useState } from 'react';
import { useTeamBioMutation } from '@/lib/mutations/useTeamBioMutation';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import CommonInputBar from '../../common/CommonInputBar';
import Text from '@/components/common/Text';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE, ICONBUTTON_MODE } from '@/constants/mode.constants';
import IconButton from '@/components/common/button/IconButton';
import { TeamFormData } from '@/lib/services/team-client.services';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useTeamBioUpdateForm } from '@/lib/hooks/useTeamBioUpdateForm';

type TeamBioProps = {
  teamBio: string;
  teamId: string;
};

const TeamBioEditMode = ({ teamBio, teamId }: TeamBioProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // react-hook-form
  const { teamBioValidation, register, handleSubmit, errors } =
    useTeamBioUpdateForm(teamBio);

  // tanstack query - useMutation
  const { mutate, isPending: isTeamBioPending } = useTeamBioMutation(teamId);
  // tanstack query - useQuery
  const {
    data: teamData,
    isPending: isTeamDataPending,
    isError: isTeamDataError,
  } = useSingleTeamQuery(teamId);

  // form onSubmit handler
  const handleOnSubmit = (data: TeamFormData) => {
    mutate(data);
    setIsEditMode(false);
  };

  // Edit 버튼 클릭시 mode 전환
  const handleEditBtnClick = () => {
    setIsEditMode(true);
  };

  const handleCancelBtnClick = () => {
    setIsEditMode(false);
  };

  return (
    <div className="w-full h-[50px] flex items-center justify-between">
      {isTeamDataPending ? (
        <Text>로딩 중...</Text>
      ) : isTeamDataError || !teamData ? (
        <Text>데이터 불러오기 실패</Text>
      ) : isEditMode ? (
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="w-full flex justify-between items-baseline gap-2"
        >
          <div className="flex-1 flex flex-col justify-start mt-[30px] gap-[2px]">
            <CommonInputBar
              id="teamBio"
              {...register('teamBio', teamBioValidation)}
            />
            <ErrorMessage>
              {errors.teamBio && errors.teamBio.message}
            </ErrorMessage>
          </div>
          <div className="flex gap-1">
            <ActionButton
              mode={ACTIONBUTTON_MODE.SECONDARY_SMALL}
              type="button"
              onClick={handleCancelBtnClick}
              disabled={isTeamBioPending}
            >
              취소
            </ActionButton>
            <ActionButton
              mode={ACTIONBUTTON_MODE.PRIMARY_SMALL}
              type="submit"
              disabled={isTeamBioPending}
            >
              확인
            </ActionButton>
          </div>
        </form>
      ) : (
        <div className="w-full flex items-baseline gap-5 pl-4">
          <Text>{teamData.teamBio}</Text>
          <IconButton
            mode={ICONBUTTON_MODE.EDIT}
            onClick={handleEditBtnClick}
          />
        </div>
      )}
    </div>
  );
};

export default TeamBioEditMode;
