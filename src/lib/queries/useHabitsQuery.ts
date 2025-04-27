import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { HabitsQueryResult, PageParam } from '@/types/habits.type';
import { fetchGetAllHabits } from '../services/habit-client.services';
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
    // 다음 페이지 요청을 결정하는 로직
    getNextPageParam: (lastPage, allPages) => {
      // 모든 habits 갯수 세기
      const totalFetched = allPages
        .map((page) => page.habits.length)
        .reduce((sum, length) => sum + length, 0);

      // 모든 습관을 가져왔거나, 더 가져올 습관이 없다면 종료
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
    staleTime: 0,
  });
};
