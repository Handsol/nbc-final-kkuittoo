export const QUERY_KEYS = {
  USERS: ['users'] as const,
  SINGLE_USER: (userId: string) => ['users', userId] as const,
  HABITS: (userId: string) => ['habits', userId] as const,
  TEAMS: ['teams'] as const,
  SINGLE_TEAM: (teamId: string) => ['team', teamId] as const,
};
