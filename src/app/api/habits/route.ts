import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { CreateHabit } from '@/types/mypage.type';

/**
 * 사용자의 모든 Habit 목록을 조회
 * @param {Request} - GET 요청
 * @returns {Promise<NextResponse>} - 조회된 Habit 목록 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 목록 조회
 * - `userPoints` 포함, 생성일 내림차순 정렬
 */
export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const habits = await prisma.habit.findMany({
      where: { userId: session.user.id },
      include: { userPoints: true }, //Habit 조회 시 연관된 UserPoint 데이터를 함께 가져옴
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(habits);
  } catch (error) {
    console.error('Habit 조회 에러:', error);
    return NextResponse.json(
      { error: 'Habit 목록을 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
};

/**
 * 새로운 Habit 생성
 * @param {Request} - POST 요청
 * @returns {Promise<NextResponse>} - 생성된 Habit 또는 에러
 * @throws {Error} 데이터베이스 생성 실패했을 때
 * @description
 * - 인증된 사용자가 새로운 Habit 생성
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인
 */
export const POST = async (request: Request) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const body = (await request.json()) as CreateHabit;
    console.log('Request Body:', body);
    const { title, notes, categories, mon, tue, wed, thu, fri, sat, sun } =
      body;

    // 유효성 검사
    if (!title || title.trim().length < 1 || title.trim().length > 15) {
      return NextResponse.json(
        { error: '제목은 1~15자여야 하며, 앞뒤 공백을 허용하지 않습니다.' },
        { status: 400 },
      );
    }
    if (notes && (notes.length < 1 || notes.length > 50)) {
      return NextResponse.json(
        { error: '메모는 1~50자여야 합니다.' },
        { status: 400 },
      );
    }
    if (!categories || categories.trim() === '') {
      return NextResponse.json(
        { error: '카테고리는 1개 이상 선택해야 합니다.' },
        { status: 400 },
      );
    }

    const habit = await prisma.habit.create({
      data: {
        title: title.trim(),
        notes,
        categories,
        mon: mon ?? false,
        tue: tue ?? false,
        wed: wed ?? false,
        thu: thu ?? false,
        fri: fri ?? false,
        sat: sat ?? false,
        sun: sun ?? false,
        userId: session.user.id,
      },
    });

    return NextResponse.json(habit, { status: 201 });
  } catch (error) {
    console.error('Habit 생성 에러:', error);
    return NextResponse.json(
      { error: 'Habit 생성에 실패했습니다.' },
      { status: 500 },
    );
  }
};
