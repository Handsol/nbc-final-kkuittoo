import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HABIT_VALIDATION } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { CreateHabit, UpdateHabit } from '@/types/habits.type';
import { Habit, UserPoint } from '@prisma/client';
import { NextResponse } from 'next/server';
import { isCooldownActive } from './habit.utils';

/**
 * 습관 데이터의 유효성을 검사
 * @param {Object} data - 검증할 습관 데이터
 * @returns {Record<string, string>} - 유효성 검사 실패 시 에러 메시지를 포함한 객체
 */
export const validateHabits = (data: {
  title?: string;
  notes?: string;
  categories?: string;
}): Record<string, string> => {
  const errors: Record<string, string> = {}; // 빈객체인데, 필요한 에러만 채움
  const { title, notes, categories } = data;

  if (
    !title ||
    title.trim() === '' ||
    title.trim().length < HABIT_VALIDATION.TITLE.MIN_LENGTH ||
    title.trim().length > HABIT_VALIDATION.TITLE.MAX_LENGTH
  ) {
    errors.title = HABIT_ERROR_MESSAGES.TITLE_LENGTH;
  }

  if (
    !notes ||
    notes.trim() === '' ||
    (notes && notes.length < HABIT_VALIDATION.NOTES.MIN_LENGTH) ||
    (notes && notes.length > HABIT_VALIDATION.NOTES.MAX_LENGTH)
  ) {
    errors.notes = HABIT_ERROR_MESSAGES.NOTES_LENGTH;
  }

  if (categories !== undefined && categories.trim() === '') {
    errors.categories = HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED;
  }

  return errors;
};

/**
 * 습관 입력 데이터를 검증하고 에러 응답을 반환
 * @param {CreateHabit | UpdateHabit} body - 검증할 습관 입력 데이터
 * @returns {NextResponse | null} - 에러가 있으면 응답 객체, 없으면 null
 */
export const validateHabitInput = (body: CreateHabit | UpdateHabit) => {
  const errors = validateHabits(body);
  if (Object.keys(errors).length > 0) {
    const firstError = Object.values(errors)[0];
    return NextResponse.json(
      { error: firstError },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }
  return null;
};

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
