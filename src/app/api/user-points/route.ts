import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateUserPoint } from '@/types/mypage.type';
import { getServerSession } from 'next-auth';
import {
  ONE_HOUR_COOLDOWN_MS,
  POINTS_TO_ADD,
} from '@/constants/habits.constants';
import { ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { authOptions } from '@/lib/utils/auth';
import { HTTP_STATUS } from '@/constants/http-status.constants';

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
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.AUTH_REQUIRED },
      { status: HTTP_STATUS.FORBIDDEN },
    );
  }

  try {
    const body = (await request.json()) as CreateUserPoint;
    const { habitId } = body;

    const habit = await prisma.habit.findUnique({
      where: { id: habitId },
      include: { userPoints: true },
    });

    if (!habit) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.HABIT_NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.NO_PERMISSION },
        { status: HTTP_STATUS.FORBIDDEN },
      );
    }

    // 현재 요일 확인
    const now = new Date();
    const dayOfWeek = now.getDay();
    const days = [
      habit.sun,
      habit.mon,
      habit.tue,
      habit.wed,
      habit.thu,
      habit.fri,
      habit.sat,
    ];
    if (!days[dayOfWeek]) {
      return NextResponse.json(
        { error: ERROR_MESSAGES.INVALID_DAY },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 최근 1시간 내 포인트 추가하는지 확인
    const lastPoint = habit.userPoints
      .filter((up) => up.getTime !== null)
      .sort((a, b) => {
        if (a.getTime === null || b.getTime === null) return 0;
        return new Date(b.getTime).getTime() - new Date(a.getTime).getTime();
      })[0];
    if (lastPoint && lastPoint.getTime) {
      const lastTime = new Date(lastPoint.getTime);
      const oneHourLater = new Date(lastTime.getTime() + ONE_HOUR_COOLDOWN_MS);
      if (now < oneHourLater) {
        return NextResponse.json(
          { error: ERROR_MESSAGES.COOLDOWN_ACTIVE },
          { status: HTTP_STATUS.BAD_REQUEST },
        );
      }
    }

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
      { error: ERROR_MESSAGES.POINT_ADD_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
