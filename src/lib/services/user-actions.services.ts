'use server';

import { User, UserPoint } from '@prisma/client';
import { prisma } from '../prisma';

/**
 * 유저 프로필 조회 함수
 * @param {string} userId - 조회할 유저 ID
 * @returns {Promise<(Pick<User, 'id' | 'name' | 'bio'> & { userPoints: UserPoint[] }) | null>}
 */
export const fetchGetUserProfile = async (
  userId: string,
): Promise<
  (Pick<User, 'id' | 'name' | 'bio'> & { userPoints: UserPoint[] }) | null
> => {
  return await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      bio: true,
      userPoints: true,
    },
  });
};
