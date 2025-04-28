import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateUserPoint } from '@/types/habits.type';
import {
  MAX_POINTS_PER_DAY,
  POINTS_TO_ADD,
} from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import {
  checkCooldown,
  checkHabitPermission,
} from '@/lib/utils/habit-validation.utils';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { getCurrentDayStatus } from '@/lib/utils/habit-date.utils';

/**
 * 사용자가 Habit의 '+'버튼을 눌렀을 때 포인트 추가
 * @param {NextRequest} request - 포인트 추가 요청
 * @returns {Promise<NextResponse>} - 생성된 UserPoint 또는 에러
 * @throws {Error} 데이터베이스 생성 실패했을 때
 * @description
 * - 자신의 Habit에 포인트를 추가
 * - 포인트 추가 전, 요일과 1시간 제한 조건 체크
 * - 하루에 추가할 수 있는 최대 포인트는 10점
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
    const isValidDay = getCurrentDayStatus(habit!);

    if (!isValidDay) {
      return NextResponse.json(
        { error: HABIT_ERROR_MESSAGES.INVALID_DAY },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 최근 1시간 내 포인트 추가하는지 확인
    const cooldownError = checkCooldown(habit!.userPoints, now);
    if (cooldownError) return cooldownError;

    // 오늘 날짜 (시간 제외)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 오늘 획득한 총 포인트 계산 (모든 습관에 대한 총합)
    const todayPoints = await prisma.userPoint.aggregate({
      where: {
        userId: session.user.id,
        getTime: { gte: today.toISOString() },
      },
      _sum: { points: true },
    });
    const totalTodayPoints = todayPoints._sum.points || 0;

    // 하루 최대 포인트 검증 (10점 제한)
    if (totalTodayPoints >= MAX_POINTS_PER_DAY) {
      return NextResponse.json(
        { error: HABIT_ERROR_MESSAGES.DAILY_POINT_LIMIT_EXCEEDED },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 추가할 포인트 계산 (남은 양이 1점 미만이면 남은 양만 추가)
    const pointsToAdd = Math.min(
      POINTS_TO_ADD,
      MAX_POINTS_PER_DAY - totalTodayPoints,
    );

    // 포인트 추가 (계산된 pointsToAdd 사용)
    const userPoint = await prisma.userPoint.create({
      data: {
        userId: session.user.id,
        habitId,
        getTime: now.toISOString(),
        points: pointsToAdd,
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

/**
 * 사용자 포인트 목록 조회
 * @returns {Promise<NextResponse>} - 포인트 목록 또는 에러 응답
 * @description
 * - 인증된 사용자의 포인트 목록 조회
 */
export const GET = async () => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const userId = session.user.id;
    const userPoints = await prisma.userPoint.findMany({
      where: { userId },
    });

    return NextResponse.json(userPoints);
  } catch (error) {
    console.error('UserPoint 조회 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
