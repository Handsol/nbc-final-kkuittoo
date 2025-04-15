import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { Habit, UserPoint } from '@prisma/client';
import { NextResponse } from 'next/server';
import { isCooldownActive } from './habit-points.utils';

/**
 * 습관에 대한 사용자 권한을 확인
 * @param {Habit | null} habit - 확인할 습관 객체
 * @param {string} userId - 현재 사용자 ID
 * @returns {NextResponse | null} - 권한 문제가 있으면 응답 객체, 없으면 null
 */
export const checkHabitPermission = (habit: Habit | null, userId: string) => {
  if (!habit) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.HABIT_NOT_FOUND },
      { status: HTTP_STATUS.NOT_FOUND },
    );
  }
  if (habit.userId !== userId) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.NO_PERMISSION },
      { status: HTTP_STATUS.FORBIDDEN },
    );
  }
  return null;
};

/**
 * 습관의 쿨다운 상태를 확인합니다.
 * @param {UserPoint[]} userPoints - 사용자의 포인트 기록
 * @param {Date} now - 현재 시간
 * @returns {NextResponse | null} - 쿨다운 중이면 응답 객체, 아니면 null
 */
export const checkCooldown = (userPoints: UserPoint[], now: Date) => {
  if (isCooldownActive(userPoints, now)) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.COOLDOWN_ACTIVE },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }
  return null;
};
