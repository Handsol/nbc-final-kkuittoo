import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateProfile } from '@/types/profile.type';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { USER_VALIDATION } from '@/constants/validation.constants';
import {
  errorResponse,
  successResponse,
} from '@/lib/utils/user-response.utils';
import { checkUpdateUserValidation } from '@/lib/utils/user-validation.utils';

type RouteParams = {
  params: { id: string };
};

export const validateProfileInput = (body: UpdateProfile) => {
  const { name, bio } = body;

  // 닉네임 유효성 검사
  if (
    name &&
    (name.trim().length < USER_VALIDATION.NAME.MIN ||
      name.trim().length > USER_VALIDATION.NAME.MAX)
  ) {
    return NextResponse.json(
      { error: USER_ERROR_MESSAGES.NAME_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  // 자기소개 유효성 검사
  if (
    bio &&
    (bio.trim().length < USER_VALIDATION.BIO.MIN ||
      bio.trim().length > USER_VALIDATION.BIO.MAX)
  ) {
    return NextResponse.json(
      { error: USER_ERROR_MESSAGES.BIO_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  return null;
};

/**
 * 단일 사용자 정보 조회
 * @param {Request} - GET 요청
 * @returns {Promise<NextResponse>} - 조회된 유저 정보 또는 에러
 * @throws {Error} 데이터베이스 조회 실패 시
 * @description
 * - 로그인 시 Header 프로필에 유저 정보 표시
 */
export const GET = async (request: Request, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userPoints: true },
    });

    if (!user) {
      return errorResponse(
        USER_ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    if (id !== session.user.id) {
      return errorResponse(
        USER_ERROR_MESSAGES.INVALID_USER,
        HTTP_STATUS.FORBIDDEN,
      );
    }

    return successResponse(user);
  } catch (error) {
    console.error('Users 조회 에러:', error);
    return errorResponse(USER_ERROR_MESSAGES.FETCH_FAILED);
  }
};

/**
 * Profile 수정
 * @param {Request} - PATCH 요청
 * @returns {Promise<NextResponse>} - 수정된 User 정보 또는 에러
 * @throws {Error} 데이터베이스 업데이트 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Profile 수정
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인
 */

export const PATCH = async (request: Request, { params }: RouteParams) => {
  const { response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const body = (await request.json()) as UpdateProfile;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return errorResponse(
        USER_ERROR_MESSAGES.USER_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND,
      );
    }

    const validationError = checkUpdateUserValidation(body);
    if (validationError) return validationError;

    const updatedProfile = await prisma.user.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name.trim() }),
        ...(body.bio !== undefined && { bio: body.bio }),
      },
    });

    return successResponse(updatedProfile);
  } catch (error) {
    console.error('Users 업데이트 에러:', error);
    return errorResponse(USER_ERROR_MESSAGES.FETCH_FAILED);
  }
};
