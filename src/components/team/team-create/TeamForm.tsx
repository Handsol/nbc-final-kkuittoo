'use client';

import React from 'react'; // <=== select 태그 오류때문에 필요
import CommonInputBar from '@/components/common/CommonInputBar';
import Title from '@/components/common/Title';
import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TITLE_MODE } from '@/constants/mode.constants';
import { PLACEHOLDER } from '@/constants/placeholder.constants';
import { TEAM_VALIDATION } from '@/constants/validation.constants';
import { Controller, useForm } from 'react-hook-form';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

type TeamFormInputs = {
  teamName: string;
  teamBio: string;
  maxTeamSize: string;
  emblem: string;
  isOpened: boolean;
};

type TeamFormProps = {
  userId: string;
};

const TeamForm = ({ userId }: TeamFormProps) => {
  //toast
  const { toast } = useToast();
  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm<TeamFormInputs>();
  //팀이름, 팀소개, 인원수, 엠블럼, 공개비공개 여부
  const teamFormContents = [
    {
      title: 'TEAM NAME',
      id: 'teamName',
      name: 'teamName',
      type: 'text',
      placeholder: PLACEHOLDER.TEAM_NAME,
      required: TEAMS_MESSAGES.TEAM_NAME_BLANK,
      minLength: {
        value: TEAM_VALIDATION.TEAM_NAME.MIN,
        message: TEAMS_MESSAGES.TEAM_NAME_LENGTH,
      },
      maxLength: {
        value: TEAM_VALIDATION.TEAM_NAME.MAX,
        message: TEAMS_MESSAGES.TEAM_NAME_LENGTH,
      },
      error: errors.teamName,
    },
    {
      title: 'TEAM BIO',
      id: 'teamBio',
      name: 'teamBio',
      type: 'text',
      placeholder: PLACEHOLDER.TEAM_BIO,
      required: TEAMS_MESSAGES.TEAM_BIO_BLANK,
      minLength: {
        value: TEAM_VALIDATION.TEAM_BIO.MIN,
        message: TEAMS_MESSAGES.TEAM_BIO_LENGTH,
      },
      maxLength: {
        value: TEAM_VALIDATION.TEAM_BIO.MAX,
        message: TEAMS_MESSAGES.TEAM_BIO_LENGTH,
      },
      error: errors.teamBio,
    },
  ];

  const emblemOptions = [
    { id: 'lion', src: '/images/emblem-lion.png' },
    { id: 'owl', src: '/images/emblem-owl.png' },
    { id: 'cat', src: '/images/emblem-cat.png' },
    { id: 'deer', src: '/images/emblem-deer.png' },
  ];

  const selectedEmblem = watch('emblem');
  const isOpened = watch('isOpened');

  const onSubmit = async (data: TeamFormInputs) => {
    try {
      const response = await fetch('/api/teams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          maxTeamSize: parseInt(data.maxTeamSize, 10),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: '팀 생성 완료!',
          description: '팀이 성공적으로 생성되었습니다',
        });
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
            <section>
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
              <p>{error && error.message}</p>
            </section>
          );
        })}

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

        <section>
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>TEAM EMBLEM</Title>
          <div className="flex gap-4">
            {emblemOptions.map((emblem) => (
              <label key={emblem.id}>
                <input
                  type="radio"
                  value={emblem.id}
                  {...register('emblem', { required: true })}
                  className="sr-only" // 숨기고 이미지 클릭으로만 선택
                />
                <Image
                  src={emblem.src}
                  alt={emblem.id}
                  width={80}
                  height={80}
                  className={`border-2 ${
                    selectedEmblem === emblem.id
                      ? 'border-blue-500'
                      : 'border-transparent'
                  } cursor-pointer`}
                />
              </label>
            ))}
          </div>
          <p>{errors.emblem && TEAMS_MESSAGES.TEAM_EMBLEM_BLANK}</p>
        </section>

        <Controller
          name="isOpened"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <div className="flex items-center gap-4">
              <Title mode={TITLE_MODE.SECTION_SUBTITLE}>
                {isOpened ? 'OPEN' : 'PRIVATE'}
              </Title>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
                id="isOpened"
              />
            </div>
          )}
        />
        <button type="submit">확인</button>
      </form>
    </div>
  );
};

export default TeamForm;
