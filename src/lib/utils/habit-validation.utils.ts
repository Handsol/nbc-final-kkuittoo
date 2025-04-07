import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HABIT_VALIDATION } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { CreateHabit, UpdateHabit } from '@/types/mypage.type';
import { Habit, UserPoint } from '@prisma/client';
import { NextResponse } from 'next/server';
import { isCooldownActive } from './habit.utils';

export const validateHabitInput = (body: CreateHabit | UpdateHabit) => {
  const { title, notes, categories } = body;

  if (
    !title ||
    title.trim() === '' ||
    title.trim().length < HABIT_VALIDATION.TITLE.MIN_LENGTH ||
    title.trim().length > HABIT_VALIDATION.TITLE.MAX_LENGTH
  ) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.TITLE_LENGTH },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  if (
    !notes ||
    notes.trim() === '' ||
    notes.length < HABIT_VALIDATION.NOTES.MIN_LENGTH ||
    notes.length > HABIT_VALIDATION.NOTES.MAX_LENGTH
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
  if (isCooldownActive(userPoints, now)) {
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.COOLDOWN_ACTIVE },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }
  return null;
};
