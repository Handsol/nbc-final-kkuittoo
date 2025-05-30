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
      userItems: {
        select: {
          itemId: true,
          isApplied: true,
          item: {
            select: {
              itemImage: true,
            },
          },
        },
      },
    },
  });
};
/**
 * 모든 유저의 정보를 가져와서 총 포인트 기준으로 정렬한 리스트를 반환
 * offset, limit을 받아 5개씩 잘라 반환
 * @returns 유저 데이터 배열 (포인트 포함)
 */
// 유저 전체 랭킹 리스트 (rank 포함)
export const fetchGetFilteredUsersWithTotalPoints = async ({
  offset = 0,
  limit = 8, // 초기 8명 가져오기 상단3, 하단 5
}: { offset?: number; limit?: number } = {}) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      bio: true,
      characterImage: true,
      email: true,
      userPoints: {
        select: { points: true },
      },
      userItems: {
        select: {
          itemId: true,
          isApplied: true,
          item: {
            select: {
              itemImage: true,
            },
          },
        },
      },
    },
  });

  const usersWithTotalPoints = users.map((user) => ({
    ...user,
    totalPoints: user.userPoints.reduce((sum, p) => sum + p.points, 0),
  }));

  const sorted = usersWithTotalPoints.sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );

  let prevPoints: number | null = null;
  let currentRank = 1;

  const ranked = sorted.map((user, index) => {
    if (user.totalPoints === prevPoints) {
      return { ...user, rank: currentRank };
    } else {
      currentRank = index + 1;
      prevPoints = user.totalPoints;
      return { ...user, rank: currentRank };
    }
  });

  return ranked.slice(offset, offset + limit);
};

// 전체 유저 랭킹 리스트 (offset, limit 없이) 검색용
export const fetchAllUsersWithTotalPoints = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      bio: true,
      characterImage: true,
      email: true,
      userPoints: {
        select: { points: true },
      },
      userItems: {
        select: {
          itemId: true,
          isApplied: true,
          item: {
            select: {
              itemImage: true,
            },
          },
        },
      },
    },
  });

  const usersWithTotalPoints = users.map((user) => ({
    ...user,
    totalPoints: user.userPoints.reduce((sum, p) => sum + p.points, 0),
  }));

  const sorted = usersWithTotalPoints.sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );

  let prevPoints: number | null = null;
  let currentRank = 1;

  return sorted.map((user, index) => {
    if (user.totalPoints === prevPoints) {
      return { ...user, rank: currentRank };
    } else {
      currentRank = index + 1;
      prevPoints = user.totalPoints;
      return { ...user, rank: currentRank };
    }
  });
};
