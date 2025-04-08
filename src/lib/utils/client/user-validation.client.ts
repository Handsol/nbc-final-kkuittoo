import { USER_VALIDATION } from '@/constants/validation.constants';

type ValidationResult = {
  isValid: boolean;
  field: 'name' | 'bio' | null;
  message: string;
};

/**
 * 유저 닉네임/소개 수정 시 유효성 검사 (클라이언트용)
 */
export const validateUserProfile = (
  name: string,
  bio: string,
): ValidationResult => {
  if (
    name.trim().length < USER_VALIDATION.NAME.MIN ||
    name.trim().length > USER_VALIDATION.NAME.MAX
  ) {
    return {
      isValid: false,
      field: 'name',
      message: `닉네임은 ${USER_VALIDATION.NAME.MIN}자 이상, ${USER_VALIDATION.NAME.MAX}자 이하여야 합니다.`,
    };
  }

  if (
    bio.trim().length < USER_VALIDATION.BIO.MIN ||
    bio.trim().length > USER_VALIDATION.BIO.MAX
  ) {
    return {
      isValid: false,
      field: 'bio',
      message: `소개는 ${USER_VALIDATION.BIO.MIN}자 이상, ${USER_VALIDATION.BIO.MAX}자 이하여야 합니다.`,
    };
  }

  return {
    isValid: true,
    field: null,
    message: '',
  };
};
