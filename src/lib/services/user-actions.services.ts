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
      teamMembers: true,
    },
  });
};
/**
 * 모든 유저의 정보를 가져와서 총 포인트 기준으로 정렬한 리스트를 반환
 *
 * @returns 유저 데이터 배열 (포인트 포함)
 */
export const fetchGetUsersWithTotalPoints = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      bio: true,
      characterImage: true,
      email: true,
      userPoints: {
        select: {
          points: true,
        },
      },
    },
  });

  // 총 포인트 계산 및 정렬
  const usersWithTotalPoints = users.map((user) => ({
    ...user,
    totalPoints: user.userPoints.reduce((sum, point) => sum + point.points, 0),
  }));

  return usersWithTotalPoints.sort((a, b) => b.totalPoints - a.totalPoints);
};
