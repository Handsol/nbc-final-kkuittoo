'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type TeamBioProps = {
  teamBio: string;
  teamId: string;
};

type FormData = {
  teamBio: string;
};

const TeamBio = ({ teamBio, teamId }: TeamBioProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [bio, setBio] = useState(teamBio);

  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      teamBio,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(`/api/teams/${teamId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('팀 소개 수정 실패');
      }

      return res.json();
    },
    onMutate: async (newData) => {
      // 1. 이전 bio 저장
      await queryClient.cancelQueries({ queryKey: ['team', teamId] });

      const previousBio = bio;

      // 2. UI를 optimistic하게 먼저 업데이트
      setBio(newData.teamBio);
      setIsEditMode(false);

      // 3. 실패 시 rollback할 수 있도록 이전 상태 리턴
      return { previousBio };
    },
    onError: (err, newData, context) => {
      // 요청 실패 시 이전 상태로 복구
      if (context?.previousBio) {
        setBio(context.previousBio);
      }
      console.error('수정 실패:', err);
    },
    onSettled: () => {
      // 성공/실패 여부 상관없이 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['team', teamId] });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate({ teamBio: data.teamBio });
    setIsEditMode(false);
  };

  const handleEditBtnClick = () => {
    setIsEditMode(true);
  };

  return (
    <div>
      {isEditMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input id="teamBio" {...register('teamBio')} />
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
          <p>{bio}</p>
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
