'use client';

import { useForm } from 'react-hook-form';
import { useUserProfileMutation } from '@/lib/mutations/useUserProfileMutation';
import CommonInputBar from '@/components/common/CommonInputBar';
import { UserFormData } from '@/lib/services/user-client.services';
import { toast } from '@/lib/hooks/use-toast';
import { validateUserProfile } from '@/lib/utils/client/user-validation.client';
import IconButton from '@/components/common/button/IconButton';
import { ICONBUTTON_MODE, USER_TITLE_MODE } from '@/constants/mode.constants';
import BioInputBar from './items/BioInputBar';
import { USER_VALIDATION } from '@/constants/validation.constants';
import UserTitle from '@/components/common/UserTitle';

type Props = UserFormData & {
  userId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

const UserProfileEditMode = ({
  name,
  bio,
  userId,
  onCancel,
  onSuccess,
}: Props) => {
  const { handleSubmit, reset, watch } = useForm<UserFormData>({
    defaultValues: { name, bio },
  });
  const { mutate: updateUser, isPending } = useUserProfileMutation(userId);

  const [nameValue, bioValue] = watch(['name', 'bio']);

  const onSubmit = (data: UserFormData) => {
    const validation = validateUserProfile(data.name, data.bio);

    if (!validation.isValid) {
      toast({
        title: validation.field === 'name' ? '닉네임 오류' : '소개 오류',
        description: validation.message,
        variant: 'destructive',
      });
      return;
    }

    updateUser(data, {
      onSuccess: () => {
        reset(data);
        onSuccess();
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center">
      <CommonInputBar id="name" placeholder="이름" />
      <UserTitle mode={USER_TITLE_MODE.CARD_ID}>
        {nameValue?.length || 0} / {USER_VALIDATION.NAME.MAX}
      </UserTitle>
      <BioInputBar id="bio" placeholder="자기소개" />
      <UserTitle mode={USER_TITLE_MODE.CARD_ID}>
        {bioValue?.length || 0} / {USER_VALIDATION.BIO.MAX}
      </UserTitle>

      <div className="flex gap-2 mt-2">
        <IconButton
          mode={ICONBUTTON_MODE.CONFIRM}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
        />
        <IconButton mode={ICONBUTTON_MODE.DELETE} onClick={onCancel} />
      </div>
    </div>
  );
};

export default UserProfileEditMode;
