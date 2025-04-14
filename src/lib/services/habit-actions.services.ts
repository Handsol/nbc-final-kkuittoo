'use server';

import { prisma } from '@/lib/prisma';
import { HabitWithPoints } from '@/types/habits.type';

export const fetchGetUserHabits = async (
  userId: string,
): Promise<HabitWithPoints[]> => {
  try {
    const habits = await prisma.habit.findMany({
      where: { userId },
      include: { userPoints: true },
    });
    return habits;
  } catch (error) {
    console.error('습관 데이터 페칭 실패:', error);
    return [];
  }
};
