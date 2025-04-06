export const QUERY_KEYS = {
  HABITS: (userId: string) => ['habits', userId] as const,
};
