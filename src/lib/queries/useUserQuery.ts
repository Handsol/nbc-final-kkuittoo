import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { fetchGetUserProfileWithClient } from '../services/user-client.services';

/**
 * 사용자의 프로필 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.SINGLE_USER(userId),
    queryFn: () => fetchGetUserProfileWithClient(userId),
    enabled: !!userId,
    staleTime: 0,
  });
};
