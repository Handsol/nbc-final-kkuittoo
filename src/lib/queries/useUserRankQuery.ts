'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGetUserRankList } from '../services/user-client.services';
import { UserData } from '@/types/rank.type';
import { BATCH_SIZE } from '@/constants/rank-pagination.constants';

/**
 * 더보기 버튼으로 유저 리스트 가져오는 쿼리 훅
 */
export const useUserRankQuery = () => {
  return useInfiniteQuery<UserData[]>({
    queryKey: ['users'],
    queryFn: ({ pageParam = 0 }) =>
      fetchGetUserRankList(pageParam as number, BATCH_SIZE.USER_RANK),
    initialPageParam: 8,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < BATCH_SIZE.USER_RANK) {
        return undefined;
      }
      const fetchedUserCount = allPages.flat().length + 8;
      return fetchedUserCount;
    },
    enabled: false,
  });
};
