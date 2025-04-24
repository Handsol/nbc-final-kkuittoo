import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { USER_VALIDATION } from '@/constants/validation.constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { userSchema } from '../schema/user.schema';

export const useUserUpdateForm = (name: string, bio: string) => {
  const userProfileValidation = {
    nickname: {
      required: USER_ERROR_MESSAGES.BLANK,
      minLength: {
        value: USER_VALIDATION.NAME.MIN,
        message: USER_ERROR_MESSAGES.NAME_LENGTH,
      },
      maxLength: {
        value: USER_VALIDATION.NAME.MAX,
        message: USER_ERROR_MESSAGES.NAME_LENGTH,
      },
    },
    bio: {
      maxLength: {
        value: USER_VALIDATION.BIO.MAX,
        message: USER_ERROR_MESSAGES.BIO_LENGTH,
      },
    },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name,
      bio,
    },
  });

  return { userProfileValidation, register, handleSubmit, errors };
};
