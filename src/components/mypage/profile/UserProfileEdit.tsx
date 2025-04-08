'use client';

import ActionButton from '@/components/common/button/ActionButton';
import CommonInputBar from '@/components/common/CommonInputBar';
import Text from '@/components/common/Text';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { useUserProfileMutation } from '@/lib/mutations/useUserProfileMutation';
import { UserFormData } from '@/lib/services/user-client.services';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { USER_VALIDATION } from '@/constants/validation.constants';
import { toast } from '@/hooks/use-toast';

type Props = {
  name: string;
  bio: string;
  userId: string;
};

const UserProfileEdit = ({ name, bio, userId }: Props) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const { register, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues: { name, bio },
  });

  const { mutate: updateUser, isPending } = useUserProfileMutation(userId);

  const onSubmit = (data: UserFormData) => {
    const { name, bio } = data;

    // 닉네임 검사
    if (
      name.trim().length < USER_VALIDATION.NAME.MIN ||
      name.trim().length > USER_VALIDATION.NAME.MAX
    ) {
      toast({
        title: '닉네임 오류',
        description: `닉네임은 ${USER_VALIDATION.NAME.MIN}자 이상, ${USER_VALIDATION.NAME.MAX}자 이하여야 합니다.`,
        variant: 'destructive',
      });
      return;
    }

    // 자기소개 검사
    if (
      bio.trim().length < USER_VALIDATION.BIO.MIN ||
      bio.trim().length > USER_VALIDATION.BIO.MAX
    ) {
      toast({
        title: '소개 오류',
        description: `소개는 ${USER_VALIDATION.BIO.MIN}자 이상, ${USER_VALIDATION.BIO.MAX}자 이하여야 합니다.`,
        variant: 'destructive',
      });
      return;
    }

    updateUser(data, {
      onSuccess: () => {
        setIsEditMode(false);
      },
    });
  };

  const onCancel = () => {
    reset();
    setIsEditMode(false);
  };

  return (
    <div className="flex flex-col gap-2">
      {isEditMode ? (
        <>
          <CommonInputBar id="name" placeholder="이름" {...register('name')} />
          <CommonInputBar id="bio" placeholder="소개" {...register('bio')} />

          <div className="flex gap-2 mt-2">
            <ActionButton
              mode="primary-small"
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              확인
            </ActionButton>
            <ActionButton
              mode="secondary-small"
              type="button"
              onClick={onCancel}
            >
              취소
            </ActionButton>
          </div>
        </>
      ) : (
        <>
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{name}</UserTitle>
          <Text>{bio}</Text>
          <ActionButton
            mode="primary-small"
            onClick={() => setIsEditMode(true)}
          >
            수정
          </ActionButton>
        </>
      )}
    </div>
  );
};

export default UserProfileEdit;
