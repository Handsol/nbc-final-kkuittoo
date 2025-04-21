'use client';

import { useForm } from 'react-hook-form';
import { useUserProfileMutation } from '@/lib/mutations/useUserProfileMutation';
import CommonInputBar from '@/components/common/CommonInputBar';
import ActionButton from '@/components/common/button/ActionButton';
import { UserFormData } from '@/lib/services/user-client.services';
import { toast } from '@/lib/hooks/use-toast';
import { validateUserProfile } from '@/lib/utils/client/user-validation.client';
import IconButton from '@/components/common/button/IconButton';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import BioInputBar from './items/BioInputBar';
import Text from '@/components/common/Text';
import { USER_VALIDATION } from '@/constants/validation.constants';

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
  const { register, handleSubmit, reset } = useForm<UserFormData>({
    defaultValues: { name, bio },
  });

  const { mutate: updateUser, isPending } = useUserProfileMutation(userId);

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
    <div className="flex flex-col gap-1 items-center min-h-[160px] justify-between">
      <CommonInputBar id="name" {...register('name')} />
      <Text className="w-full text-left pl-2 text-body-md text-medium-gray">
        MAX : {USER_VALIDATION.NAME.MAX} 글자
      </Text>
      <CommonInputBar id="bio" {...register('bio')} />
      <Text className="w-full text-left pl-2 text-body-md text-medium-gray">
        {' '}
        MAX : {USER_VALIDATION.BIO.MAX} 글자
      </Text>

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
