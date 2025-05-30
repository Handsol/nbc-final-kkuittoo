import { Categories } from '@prisma/client';

export const QUERY_KEYS = {
  USERS: ['users'] as const,
  SINGLE_USER: (userId: string) => ['users', userId] as const,
  BASE_HABITS: (userId: string) => ['habits', userId] as const,
  HABITS: (userId: string, days?: string[], category?: Categories | null) =>
    ['habits', userId, days ?? [], category ?? null] as const,
  TEAMS: ['teams'] as const,
  SINGLE_TEAM: (teamId: string) => ['team', teamId] as const,
  USER_POINTS: (userId: string) => ['userPoints', userId] as const,
  PURCHASED_ITEMS: ['purchasedItems'] as const,
  NOT_PURCHASED_ITEMS: ['notPurchasedItems'] as const,
};
