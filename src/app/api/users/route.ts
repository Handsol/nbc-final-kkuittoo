import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { errorResponse } from '@/lib/utils/user-response.utils';

/**
 * 모든 사용자 목록 조회
 * @param {Request} - GET 요청
 * @returns {Promise<NextResponse>} - 조회된 User 목록 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 가입된 모든 사용자 정보 불러오기
 */

export const GET = async () => {
  const { response } = await checkAuth();
  if (response) return response;

  // 모든 사용자의 정보와 UserPoint 테이블에서 points 컬럼도 함께 가져오기
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        bio: true,
        userPoints: {
          select: {
            points: true, // userPoints 테이블에서 points만 선택
          },
        },
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Users 조회 에러:', error);
    return errorResponse(USER_ERROR_MESSAGES.FETCH_FAILED);
  }
};
