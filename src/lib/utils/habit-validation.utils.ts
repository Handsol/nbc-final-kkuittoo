import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import {
  HABIT_VALIDATION,
  ONE_HOUR_COOLDOWN_MS,
} from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { CreateHabit, UpdateHabit } from '@/types/mypage.type';
import { Habit, UserPoint } from '@prisma/client';
import { NextResponse } from 'next/server';

export const validateHabitInput = (body: CreateHabit | UpdateHabit) => {
  const { title, notes, categories } = body;

  if (
    title &&
    (title.trim().length < HABIT_VALIDATION.TITLE.MIN_LENGTH ||
      title.trim().length > HABIT_VALIDATION.TITLE.MAX_LENGTH)
  ) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.TITLE_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  if (
    notes &&
    (notes.length < HABIT_VALIDATION.NOTES.MIN_LENGTH ||
      notes.length > HABIT_VALIDATION.NOTES.MAX_LENGTH)
  ) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.NOTES_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  if (categories !== undefined && categories.trim() === '') {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED },
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
  const lastPoint = userPoints
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
        { error: HABIT_ERROR_MESSAGES.COOLDOWN_ACTIVE },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }
  }
  return null;
};
