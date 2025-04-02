import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateHabit } from '@/types/mypage.type';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { DAYS_OF_WEEK, HABIT_VALIDATION } from '@/constants/habits.constants';
import { ERROR_MESSAGES } from '@/constants/error-messages.constants';

type RouteParams = {
  params: { id: string };
};

/**
 *
 * 클릭한 Habit의 정보를 조회
 * @param {Request} request - Habit 정보 요청
 * @returns {Promise<NextResponse>} - 조회된 Habit 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 조회
 * - `userPoints` 포함
 */
export const GET = async (request: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.AUTH_REQUIRED },
      { status: 403 },
    );
  }

  try {
    const { id } = params;
    const habit = await prisma.habit.findUnique({
      where: { id },
      include: { userPoints: true },
    });

    if (!habit) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.HABIT_NOT_FOUND },
        { status: 404 },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_PERMISSION },
        { status: 403 },
      );
    }

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Habit 조회 에러:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.FETCH_FAILED },
      { status: 500 },
    );
  }
};

/**
 * Habit 수정
 * @param {Request} request - Habit 수정 요청
 * @returns {Promise<NextResponse>} - 수정된 Habit 또는 에러
 * @throws {Error} 데이터베이스 업데이트 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 수정
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인
 */
export const PATCH = async (request: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.AUTH_REQUIRED },
      { status: 403 },
    );
  }

  try {
    const { id } = params;
    const body = (await request.json()) as UpdateHabit;
    const { title, notes, categories, ...days } = body;

    const habit = await prisma.habit.findUnique({ where: { id } });
    if (!habit) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.HABIT_NOT_FOUND },
        { status: 404 },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_PERMISSION },
        { status: 403 },
      );
    }

    // 유효성 검사
    if (
      title &&
      (title.trim().length < HABIT_VALIDATION.TITLE.MIN_LENGTH ||
        title.trim().length > HABIT_VALIDATION.TITLE.MAX_LENGTH)
    ) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.TITLE_LENGTH },
        { status: 400 },
      );
    }
    if (
      notes &&
      (notes.length < HABIT_VALIDATION.NOTES.MIN_LENGTH ||
        notes.length > HABIT_VALIDATION.NOTES.MAX_LENGTH)
    ) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NOTES_LENGTH },
        { status: 400 },
      );
    }
    if (categories !== undefined && categories.trim() === '') {
      return NextResponse.json(
        { error: ERROR_MESSAGES.CATEGORY_REQUIRED },
        { status: 400 },
      );
    }
    const dayUpdates: Record<string, boolean> = {};
    for (const day of DAYS_OF_WEEK) {
      if (days[day] !== undefined) {
        dayUpdates[day] = days[day];
      }
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(notes !== undefined && { notes }),
        ...(categories !== undefined && { categories }),
        ...dayUpdates,
      },
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    console.error('Habit 수정 에러:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.UPDATE_FAILED },
      { status: 500 },
    );
  }
};

/**
 * Habit 삭제
 * @param {Request} request - Habit 삭제 요청
 * @returns {Promise<NextResponse>} - Habit 삭제 또는 에러
 * @throws {Error} 데이터베이스 삭제 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit만 삭제
 */
export const DELETE = async (request: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.AUTH_REQUIRED },
      { status: 403 },
    );
  }

  try {
    const { id } = params;
    const habit = await prisma.habit.findUnique({ where: { id } });

    if (!habit) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.HABIT_NOT_FOUND },
        { status: 404 },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_PERMISSION },
        { status: 403 },
      );
    }

    await prisma.habit.delete({ where: { id } });
    return NextResponse.json(
      { message: 'Habit이 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Habit 삭제 에러:', error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.DELETE_FAILED },
      { status: 500 },
    );
  }
};
