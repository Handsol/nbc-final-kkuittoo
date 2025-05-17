'use server';

import { prisma } from '@/lib/prisma';
import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { getCurrentDayField } from '../utils/habit-filter.utils';
import { isCooldownActive } from '../utils/habit-points.utils';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { PAGINATION } from '@/constants/pagination.constants';

export const fetchGetUserHabits = async (
  userId: string,
  skip = 0,
  take = PAGINATION.DEFAULT_TAKE,
  days: string[] = [],
  category: Categories | null = null,
): Promise<{ habits: HabitWithPoints[]; totalHabits: number }> => {
  try {
    const where = {
      userId,
      ...(days.length > 0 &&
        days.length < 7 && {
          AND: days.map((day) => ({ [day]: true })),
        }),
      ...(category && { categories: category }),
    };

    const currentDayField = getCurrentDayField();
    const now = new Date();

    // 1. 현재 요일 습관 조회
    const currentDayHabits = (await prisma.habit.findMany({
      where: { ...where, [currentDayField]: true },
      include: { userPoints: true },
      orderBy: { createdAt: 'desc' },
    })) as HabitWithPoints[];

    // 2. 활성화/비활성화 분류
    const [enabledHabits, disabledHabits] = currentDayHabits.reduce(
      ([enabled, disabled], habit) => {
        const isEnabled = !isCooldownActive(habit.userPoints, now);
        return isEnabled
          ? [[...enabled, habit], disabled]
          : [enabled, [...disabled, habit]];
      },
      [[], []] as [HabitWithPoints[], HabitWithPoints[]],
    );

    // 3. 다른 요일 습관 조회
    const otherHabits = (await prisma.habit.findMany({
      where: { ...where, [currentDayField]: false },
      include: { userPoints: true },
      orderBy: { createdAt: 'desc' },
    })) as HabitWithPoints[];

    // 4. 전체 습관 합치고 다시 정렬
    const allHabits = [...enabledHabits, ...disabledHabits, ...otherHabits];

    // 5. 페이지네이션
    const paginatedHabits = allHabits.slice(skip, skip + take);

    const totalHabits = allHabits.length;

    return {
      habits: paginatedHabits.map((habit) => ({
        ...habit,
        userPoints: habit.userPoints || [],
        isEnabled: enabledHabits.includes(habit),
      })),
      totalHabits,
    };
  } catch (error) {
    console.error('습관 조회 에러:', error);
    throw new Error(HABIT_ERROR_MESSAGES.FETCH_FAILED);
  }
};
