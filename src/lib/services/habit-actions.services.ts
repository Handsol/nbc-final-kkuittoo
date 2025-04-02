'use server';

import { Habit } from '@prisma/client';
import { prisma } from '../prisma';

export const fetchGetAllHabits = async (userId: string): Promise<Habit[]> => {
  return await prisma.habit.findMany({
    where: { userId },
    include: { userPoints: true },
    orderBy: { createdAt: 'desc' },
  });
};
