'use client';

import { useUserProfileMutation } from '@/lib/mutations/useUserProfileMutation';
import CommonInputBar from '@/components/common/CommonInputBar';
import { UserFormData } from '@/lib/services/user-client.services';
import IconButton from '@/components/common/button/IconButton';
import { ICONBUTTON_MODE } from '@/constants/mode.constants';
import { useUserUpdateForm } from '@/lib/hooks/useUserUpdateForm';
import ErrorMessage from '@/components/common/ErrorMessage';
import { PLACEHOLDER } from '@/constants/placeholder.constants';

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
  const { userProfileValidation, register, handleSubmit, errors } =
    useUserUpdateForm(name, bio);

  const { mutate: updateUser, isPending } = useUserProfileMutation(userId);

  const handleOnSubmit = (data: UserFormData) => {
    updateUser(data);
    onSuccess();
  };

  return (
    <div className="flex flex-col items-center min-h-[120px] justify-between">
      <CommonInputBar
        id="name"
        placeholder={PLACEHOLDER.USER_NICKNAME}
        {...register('name', userProfileValidation.nickname)}
      />
      <ErrorMessage>{errors.name && errors.name.message}</ErrorMessage>
      <textarea
        className="w-full h-11 rounded-xl px-4 bg-light-gray font-pretendard text-body-sm"
        id="bio"
        placeholder={PLACEHOLDER.USER_BIO}
        {...register('bio', userProfileValidation.bio)}
      />
      <ErrorMessage>{errors.bio && errors.bio.message}</ErrorMessage>

      <div className="flex gap-6">
        <IconButton
          mode={ICONBUTTON_MODE.CONFIRM}
          onClick={handleSubmit(handleOnSubmit)}
          disabled={isPending}
        />
        <IconButton mode={ICONBUTTON_MODE.DELETE} onClick={onCancel} />
      </div>
    </div>
  );
};

export default UserProfileEditMode;
