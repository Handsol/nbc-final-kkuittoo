'use server';

import { prisma } from '@/lib/prisma';
import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { getCurrentDayField } from '../utils/habit-filter.utils';

export const fetchGetUserHabits = async (
  userId: string,
  skip = 0,
  take = 5,
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

    const [habits, totalHabits]: [HabitWithPoints[], number] =
      await Promise.all([
        prisma.habit.findMany({
          where,
          include: { userPoints: true },
          orderBy: [
            { [currentDayField]: 'desc' }, // 현재 요일에 해당하는 습관 우선
            { createdAt: 'desc' }, // 동일 요일 내에서는 최신순
          ],
          skip,
          take,
        }) as Promise<HabitWithPoints[]>,
        prisma.habit.count({ where }),
      ]);

    return {
      habits: habits.map((habit) => ({
        ...habit,
        userPoints: habit.userPoints || [],
      })),
      totalHabits,
    };
  } catch (error) {
    console.error('습관 데이터 페칭 실패:', error);
    return { habits: [], totalHabits: 0 };
  }
};
