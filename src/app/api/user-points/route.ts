import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateUserPoint } from '@/types/habits.type';
import { POINTS_TO_ADD } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import {
  checkCooldown,
  checkHabitPermission,
} from '@/lib/utils/habit-validation.utils';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { getCurrentDayStatus } from '@/lib/utils/habit.utils';

/**
 * 사용자가 Habit의 '+'버튼을 눌렀을 때 포인트 추가
 * @param {NextRequest} request - 포인트 추가 요청
 * @returns {Promise<NextResponse>} - 생성된 UserPoint 또는 에러
 * @throws {Error} 데이터베이스 생성 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit에 포인트 추가
 * - 요일 및 1시간 제한 조건 확인 후 포인트 추가(1점-임시)
 */
export const POST = async (request: NextRequest) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const body = (await request.json()) as CreateUserPoint;
    const { habitId } = body;

    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
      include: { userPoints: true },
    });

    const permissionError = checkHabitPermission(habit, session.user.id);
    if (permissionError) return permissionError;

    // 현재 요일 확인
    const now = new Date();
    if (!getCurrentDayStatus(habit!)) {
      return NextResponse.json(
        { error: HABIT_ERROR_MESSAGES.INVALID_DAY },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 최근 1시간 내 포인트 추가하는지 확인
    const cooldownError = checkCooldown(habit!.userPoints, now);
    if (cooldownError) return cooldownError;

    // 포인트 추가
    const userPoint = await prisma.userPoint.create({
      data: {
        userId: session.user.id,
        habitId,
        getTime: now.toISOString(),
        points: POINTS_TO_ADD,
      },
    });

    return NextResponse.json(userPoint, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    console.error('UserPoint 생성 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.POINT_ADD_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
