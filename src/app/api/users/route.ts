import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

/**
 * 모든 사용자 목록 조회
 * @param {Request} - GET 요청
 * @returns {Promise<NextResponse>} - 조회된 User 목록 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 가입된 모든 사용자 정보 불러오기
 */

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    // 모든 사용자의 정보와 UserPoint 테이블에서 points 컬럼도 함께 가져오기
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
    return NextResponse.json(
      { error: 'User 목록을 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
};
