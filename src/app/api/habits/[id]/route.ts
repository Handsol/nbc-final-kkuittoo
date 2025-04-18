import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateHabit } from '@/types/habits.type';
import { DAYS_OF_WEEK } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { checkHabitPermission } from '@/lib/utils/habit-validation.utils';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { updateHabitSchema } from '@/lib/schema/habit.schema';

type RouteParams = {
  params: { id: string };
};

/**
 *
 * 클릭한 Habit의 정보를 조회
 * @param {NextRequest} request - Habit 정보 요청
 * @returns {Promise<NextResponse>} - 조회된 Habit 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 조회
 * - `userPoints` 포함
 */
export const GET = async (request: NextRequest, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const habit = await prisma.habit.findUnique({
      where: { id },
      include: { userPoints: true },
    });

    const permissionError = checkHabitPermission(habit, session.user.id);
    if (permissionError) return permissionError;

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Habit 조회 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

/**
 * Habit 수정
 * @param {NextRequest} request - Habit 수정 요청
 * @returns {Promise<NextResponse>} - 수정된 Habit 또는 에러
 * @throws {Error} 데이터베이스 업데이트 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 수정
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인 - zod
 */
export const PATCH = async (request: NextRequest, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const body = (await request.json()) as UpdateHabit;

    const habit = await prisma.habit.findUnique({ where: { id } });
    const permissionError = checkHabitPermission(habit, session.user.id);
    if (permissionError) return permissionError;

    // Zod 유효성 검사
    const result = updateHabitSchema.safeParse(body); // safeParse는 Zod 라이브러리에서 제공하는 검증 메서드로, 데이터의 유효성을 검사하면서도 에러를 발생시키지 않는 안전한 방식
    if (!result.success) {
      const firstError = result.error.errors[0].message;
      return NextResponse.json(
        { error: firstError },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const { title, notes, categories, ...days } = result.data;

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
      { error: HABIT_ERROR_MESSAGES.UPDATE_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

/**
 * Habit 삭제
 * @param {NextRequest} request - Habit 삭제 요청
 * @returns {Promise<NextResponse>} - Habit 삭제 또는 에러
 * @throws {Error} 데이터베이스 삭제 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit만 삭제
 */
export const DELETE = async (request: NextRequest, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const habit = await prisma.habit.findUnique({ where: { id } });
    const permissionError = checkHabitPermission(habit, session.user.id);
    if (permissionError) return permissionError;

    await prisma.habit.delete({ where: { id } });
    return NextResponse.json(
      { message: 'Habit이 삭제되었습니다.' },
      { status: HTTP_STATUS.SUCCESS },
    );
  } catch (error) {
    console.error('Habit 삭제 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.DELETE_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
