import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HABIT_VALIDATION } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { CreateHabit, UpdateHabit } from '@/types/mypage.type';
import { Habit, UserPoint } from '@prisma/client';
import { NextResponse } from 'next/server';
import { isCooldownActive } from './habit.utils';

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

export const checkCooldown = (userPoints: UserPoint[], now: Date) => {
  if (isCooldownActive(userPoints, now)) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.COOLDOWN_ACTIVE },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }
  return null;
};
