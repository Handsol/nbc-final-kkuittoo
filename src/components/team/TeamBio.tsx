'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTeamBioMutation } from '@/lib/mutations/useTeamBioMutation';
import { useSingleTeamQuery } from '@/lib/queries/useSingleTeamQuery';
import CommonInputBar from '../common/CommonInputBar';

type TeamBioProps = {
  teamBio: string;
  teamId: string;
};

type FormData = {
  teamBio: string;
};

const TeamBio = ({ teamBio, teamId }: TeamBioProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  // react-hook-form
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      teamBio,
    },
  });

  // tanstack query - useMutation
  const { mutate, isPending } = useTeamBioMutation(teamId, teamBio);
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
        <p>로딩 중...</p>
      ) : isTeamDataError || !teamData ? (
        <p>데이터 불러오기 실패</p>
      ) : isEditMode ? (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <CommonInputBar id="teamBio" {...register('teamBio')} />
          <button
            className="w-11 h-11 rounded-full bg-white"
            type="submit"
            disabled={isPending}
          >
            확인
          </button>
        </form>
      ) : (
        <>
          <p>{teamData.teamBio}</p>
          <button
            className="w-11 h-11 rounded-full bg-white"
            onClick={handleEditBtnClick}
          >
            수정
          </button>
        </>
      )}
    </div>
  );
};

export default TeamBio;
