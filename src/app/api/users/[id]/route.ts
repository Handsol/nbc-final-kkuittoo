import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateProfile } from '@/types/profile.type';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';

type RouteParams = {
  params: { id: string };
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
      return NextResponse.json(
        { error: USER_ERROR_MESSAGES.USER_NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    if (id !== session.user.id) {
      return NextResponse.json(
        { error: USER_ERROR_MESSAGES.INVALID_USER },
        { status: HTTP_STATUS.FORBIDDEN },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('User 조회 에러:', error);
    return NextResponse.json(
      { error: USER_ERROR_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
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
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const body = (await request.json()) as UpdateProfile;
    const { name, bio } = body;

    const user = await prisma.user.findUnique({ where: { id } });

    // 유효성 검사
    if (!user) {
      return NextResponse.json(
        { error: USER_ERROR_MESSAGES.USER_NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    if (name && (name.trim().length < 2 || name.trim().length > 10)) {
      return NextResponse.json(
        { error: USER_ERROR_MESSAGES.NAME_LENGTH },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }
    if (bio && (bio.length < 1 || bio.length > 20)) {
      return NextResponse.json(
        { error: USER_ERROR_MESSAGES.BIO_LENGTH },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const updatedProfile = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name: name.trim() }),
        ...(bio !== undefined && { bio }),
      },
    });

    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Profile 수정 에러:', error);
    return NextResponse.json(
      { error: USER_ERROR_MESSAGES.UPDATE_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
