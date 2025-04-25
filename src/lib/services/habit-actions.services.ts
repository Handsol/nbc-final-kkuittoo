'use server';

import { prisma } from '@/lib/prisma';
import { HabitWithPoints } from '@/types/habits.type';

export const fetchGetUserHabits = async (
  userId: string,
  skip: number = 0,
  take: number = 5,
): Promise<{ habits: HabitWithPoints[]; totalHabits: number }> => {
  try {
    const [habits, totalHabits] = await Promise.all([
      prisma.habit.findMany({
        where: { userId },
        include: { userPoints: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      prisma.habit.count({ where: { userId } }),
    ]);
    return { habits, totalHabits };
  } catch (error) {
    console.error('습관 데이터 페칭 실패:', error);
    return { habits: [], totalHabits: 0 };
  }
};
