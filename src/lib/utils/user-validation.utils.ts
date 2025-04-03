import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { USER_VALIDATION } from '@/constants/validation.constants';
import { User } from '@/types/profile.type';
import { NextResponse } from 'next/server';

/**
 * 닉네임 변경 시 유효성 검사 로직
 *
 * @param body Omit<User, 'id' | 'email' | 'emailVerified' | 'image'>
 * @returns null | NextResponse
 * @description
 * 1. name : 2~10자 외, 빈칸시 error
 * 2. bio : 5~20자 외, 빈칸시 error
 *
 */
export const checkUpdateUserValidation = (
  body: Omit<User, 'id' | 'email' | 'emailVerified' | 'image'>,
) => {
  const { name, bio } = body;

  // 닉네임 유효성 검사 : 2~10자, 빈칸 X
  if (
    name.length < USER_VALIDATION.NAME.MIN ||
    name.length > USER_VALIDATION.NAME.MAX ||
    !name.trim()
  ) {
    return NextResponse.json(
      { error: USER_ERROR_MESSAGES.NAME_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  // 자기소개 유효성 검사 : 5~20자, 빈칸 X
  if (
    bio.length < USER_VALIDATION.BIO.MIN ||
    bio.length > USER_VALIDATION.BIO.MAX ||
    !bio.trim()
  ) {
    return NextResponse.json(
      { error: USER_ERROR_MESSAGES.BIO_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  return null;
};
