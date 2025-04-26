import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import {
  HabitsQueryResult,
  HabitWithPoints,
  PageParam,
} from '@/types/habits.type';
import { fetchGetAllHabits } from '../services/habit-client.services';
import { STALE_TIME } from '@/constants/time.constants';
import { Categories } from '@prisma/client';

/**
 * 사용자의 습관 목록을 조회하기 위한 React Query 훅
 * @param {string} userId - 조회할 사용자의 ID
 * @returns
 */
export const useHabitsQuery = (
  userId: string,
  selectedDay: string[],
  selectedCategory: Categories | null,
) => {
  return useInfiniteQuery<
    HabitsQueryResult,
    Error,
    InfiniteData<HabitsQueryResult, PageParam>,
    readonly ['habits', string, string[], Categories | null],
    PageParam
  >({
    queryKey: QUERY_KEYS.HABITS(userId, selectedDay, selectedCategory),
    queryFn: async ({ pageParam = { skip: 0, take: 5 } }) => {
      const response = await fetchGetAllHabits(
        pageParam.skip,
        pageParam.take,
        selectedDay.length < 7 ? selectedDay : undefined, // 모든 요일 선택 시 필터 제외
        selectedCategory,
      );

      return {
        habits: response.habits,
        totalHabits: response.totalHabits,
        nextSkip: pageParam.skip + pageParam.take,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.flatMap((page) => page.habits).length;

      if (
        totalFetched >= lastPage.totalHabits ||
        lastPage.habits.length === 0
      ) {
        return undefined;
      }
      return { skip: lastPage.nextSkip, take: 5 };
    },
    initialPageParam: { skip: 0, take: 5 },
    enabled: !!userId,
    staleTime: STALE_TIME.FIVE_MINUTES,
  });
};
