'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchGetTeamRankList } from '@/lib/services/team-client.services';
import { TeamWithPoints } from '@/types/rank.type';

const BATCH_SIZE = 5;

export const useTeamRankQuery = () => {
  return useInfiniteQuery<TeamWithPoints[]>({
    queryKey: ['teams'],
    queryFn: ({ pageParam = 0 }) =>
      fetchGetTeamRankList(pageParam as number, BATCH_SIZE),
    initialPageParam: 8, // 초기 8개 (상단 3개 + 하단 5개 기준이면)
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < BATCH_SIZE) {
        return undefined;
      }
      const fetchedTeamCount = allPages.flat().length + 8;
      return fetchedTeamCount;
    },
    enabled: false,
  });
};
