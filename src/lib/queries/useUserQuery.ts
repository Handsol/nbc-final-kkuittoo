import { useQuery } from '@tanstack/react-query';
import { fetchGetUsers } from '../services/user-client.services';
import { UserData } from '@/types/rank-users.type';
import { QUERY_KEYS } from '@/constants/query-keys.constants';

export const useUserQuery = () => {
  return useQuery<UserData[]>({
    queryKey: QUERY_KEYS.USERS,
    queryFn: fetchGetUsers,
  });
};
