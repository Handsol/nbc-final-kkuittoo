'use client';

import ActionButton from '@/components/common/button/ActionButton';
import CommonInputBar from '@/components/common/CommonInputBar';
import Text from '@/components/common/Text';
import UserTitle from '@/components/common/UserTitle';
import { ICONBUTTON_MODE, USER_TITLE_MODE } from '@/constants/mode.constants';
import { useUserProfileMutation } from '@/lib/mutations/useUserProfileMutation';
import { UserFormData } from '@/lib/services/user-client.services';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from '@/lib/hooks/use-toast';
import { validateUserProfile } from '@/lib/utils/client/user-validation.client';
import { ID_SLICE } from '@/constants/magic-numbers.constants';
import IconButton from '@/components/common/button/IconButton';

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
    const validation = validateUserProfile(name, bio);

    if (!validation.isValid) {
      toast({
        title: `${validation.field === 'name' ? '닉네임 오류' : '소개 오류'}`,
        description: validation.message,
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
    <div className="flex flex-col gap-2 items-center">
      {isEditMode ? (
        <>
          <CommonInputBar id="name" placeholder="이름" {...register('name')} />

          <UserTitle mode={USER_TITLE_MODE.CARD_ID}>
            @{userId.slice(ID_SLICE.USER)}
          </UserTitle>

          <CommonInputBar id="bio" placeholder="소개" {...register('bio')} />

          <div className="flex gap-2 mt-2">
            <IconButton
              mode={ICONBUTTON_MODE.ADD}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isPending}
            ></IconButton>
            <IconButton
              mode={ICONBUTTON_MODE.DELETE}
              type="button"
              onClick={onCancel}
            ></IconButton>
          </div>
        </>
      ) : (
        <>
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{name}</UserTitle>

          <IconButton
            mode={ICONBUTTON_MODE.EDIT}
            onClick={() => setIsEditMode(true)}
          >
            수정
          </IconButton>

          <UserTitle mode={USER_TITLE_MODE.CARD_ID}>
            @{userId.slice(ID_SLICE.USER)}
          </UserTitle>

          <Text>{bio}</Text>
        </>
      )}
    </div>
  );
};

export default UserProfileEdit;
