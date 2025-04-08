import { useQuery } from '@tanstack/react-query';
import { fetchGetUsers } from '../services/user-client.services';
import { UserData } from '@/types/rank-users.type';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

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
