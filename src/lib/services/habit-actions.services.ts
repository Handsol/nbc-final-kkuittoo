'use server';

import { Habit } from '@prisma/client';
import { prisma } from '../prisma';

/**
 * 사용자의 모든 Habit 목록을 조회하는 함수
 * @param {string} userId - 조회할 사용자의 ID
 * @returns {Promise<Habit[]>} - 사용자의 Habit 목록
 */
export const fetchGetAllHabits = async (userId: string): Promise<Habit[]> => {
  return await prisma.habit.findMany({
    where: { userId },
    include: { userPoints: true },
    orderBy: { createdAt: 'desc' },
  });
};
