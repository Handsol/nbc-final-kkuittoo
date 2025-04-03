import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateHabit } from '@/types/mypage.type';
import { DAYS_OF_WEEK } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { validateHabitInput } from '@/lib/utils/habit-route-handler.utils';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';

/**
 * 사용자의 모든 Habit 목록을 조회
 * @param {NextRequest} request - Habit 목록 요청
 * @returns {Promise<NextResponse>} - 조회된 Habit 목록 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 목록 조회
 * - `userPoints` 포함, 생성일 내림차순 정렬
 */
export const GET = async () => {
  const { session, response } = await checkAuth();
  if (response) return response;

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
      { error: HABIT_ERROR_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

/**
 * 새로운 Habit 생성
 * @param {NextRequest} request - 새로운 Habit 생성 요청
 * @returns {Promise<NextResponse>} - 생성된 Habit 또는 에러
 * @throws {Error} 데이터베이스 생성 실패했을 때
 * @description
 * - 인증된 사용자가 새로운 Habit 생성
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인
 */
export const POST = async (request: NextRequest) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const body = (await request.json()) as CreateHabit;
    const { title, notes, categories, ...days } = body;

    // 유효성 검사
    const validationError = validateHabitInput(body);
    if (validationError) return validationError;

    const dayData: Record<string, boolean> = {};
    for (const day of DAYS_OF_WEEK) {
      dayData[day] = days[day] ?? false;
    }

    const habit = await prisma.habit.create({
      data: {
        title: title.trim(),
        notes,
        categories,
        ...dayData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(habit, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    console.error('Habit 생성 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.CREATE_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
