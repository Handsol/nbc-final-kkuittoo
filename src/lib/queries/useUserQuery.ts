import { useQuery } from '@tanstack/react-query';
import { fetchGetUsers } from '../services/user-client.services';
import { UserData } from '@/types/rank.type';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { fetchGetUserProfile } from '../services/user-actions.services';

/**
 * 유저랭킹에서 유저 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useUserRankQuery = () => {
  return useQuery<UserData[]>({
    queryKey: QUERY_KEYS.USERS,
    queryFn: fetchGetUsers,
  });
};

/**
 * 사용자의 프로필 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.SINGLE_USER(userId),
    queryFn: () => fetchGetUserProfile(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
  });
};
