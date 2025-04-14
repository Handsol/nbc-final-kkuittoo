import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { useQuery } from '@tanstack/react-query';
import { fetchGetUserPoints } from '../services/user-points.services';
import { STALE_TIME } from '@/constants/time.constants';

export const useUserPointsQuery = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.USER_POINTS(userId),
    queryFn: () => fetchGetUserPoints(),
    enabled: !!userId,
    staleTime: STALE_TIME.FIVE_MINUTES,
    select: (data) => data.reduce((sum, p) => sum + p.points, 0),
  });
};
