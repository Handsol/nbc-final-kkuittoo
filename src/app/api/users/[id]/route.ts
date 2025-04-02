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
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const body = (await request.json()) as UpdateProfile;
    const { name, bio } = body;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json(
        { error: 'User를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    // 유효성 검사
    if (name && (name.trim().length < 2 || name.trim().length > 10)) {
      return NextResponse.json(
        { error: '닉네임은 1~10자여야 하며, 앞뒤 공백을 허용하지 않습니다.' },
        { status: 400 },
      );
    }
    if (bio && (bio.length < 1 || bio.length > 20)) {
      return NextResponse.json(
        { error: '자기소개는 1~20자여야 합니다.' },
        { status: 400 },
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
      { error: 'Profile 수정에 실패했습니다.' },
      { status: 500 },
    );
  }
};
