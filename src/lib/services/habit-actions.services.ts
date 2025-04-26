'use server';

import { prisma } from '@/lib/prisma';
import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';

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

    const [habits, totalHabits]: [HabitWithPoints[], number] =
      await Promise.all([
        prisma.habit.findMany({
          where,
          include: { userPoints: true },
          skip,
          take,
        }) as Promise<HabitWithPoints[]>,
        prisma.habit.count({ where }),
      ]);

    return {
      habits: habits.map((habit) => ({
        ...habit,
        userPoints: habit.userPoints || [], // userPoints가 항상 배열로 반환
      })),
      totalHabits,
    };
  } catch (error) {
    console.error('습관 데이터 페칭 실패:', error);
    return { habits: [], totalHabits: 0 };
  }
};
