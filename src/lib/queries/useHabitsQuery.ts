import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { HabitWithPoints } from '@/types/habits.type';
import { fetchGetAllHabits } from '../services/habit-client.services';
import { STALE_TIME } from '@/constants/time.constants';

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
// 페이지 파라미터 타입
type PageParam = {
  skip: number;
  take: number;
};

// 쿼리 결과 타입
type HabitsQueryResult = {
  habits: HabitWithPoints[];
  totalHabits: number;
  nextSkip: number;
};

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useHabitsQuery = (userId: string) => {
  return useInfiniteQuery<
    HabitsQueryResult,
    Error,
    InfiniteData<HabitsQueryResult, PageParam>,
    readonly ['habits', string],
    PageParam
  >({
    queryKey: QUERY_KEYS.HABITS(userId),
    queryFn: async ({ pageParam = { skip: 0, take: 5 } }) => {
      const response = await fetchGetAllHabits(pageParam.skip, pageParam.take);
      return {
        habits: response.habits,
        totalHabits: response.totalHabits,
        nextSkip: pageParam.skip + pageParam.take,
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.nextSkip >= lastPage.totalHabits) {
        return undefined;
      }
      return { skip: lastPage.nextSkip, take: 5 };
    },
    initialPageParam: { skip: 0, take: 5 },
    enabled: !!userId,
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
};
