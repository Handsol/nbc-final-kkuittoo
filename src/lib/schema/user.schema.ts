import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { USER_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(USER_VALIDATION.NAME.MIN, USER_ERROR_MESSAGES.NAME_LENGTH)
    .max(USER_VALIDATION.NAME.MAX, USER_ERROR_MESSAGES.NAME_LENGTH)
    .transform((value) => value.trim()),
  bio: z
    .string()
    .max(USER_VALIDATION.BIO.MAX, USER_ERROR_MESSAGES.BIO_LENGTH)
    .transform((value) => value.trim()),
});

export type UserFormSchema = z.infer<typeof userSchema>;
