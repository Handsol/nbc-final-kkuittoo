import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateProfile } from '@/types/profile.type';

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
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { userPoints: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User 정보가 존재하지 않습니다.' },
        { status: 404 },
      );
    }

    if (id !== session.user.id) {
      return NextResponse.json(
        { error: '자신의 정보만 조회할 수 있습니다.' },
        { status: 403 },
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('User 조회 에러:', error);
    return NextResponse.json(
      { error: 'User 정보를 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
};
