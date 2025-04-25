import { QUERY_KEYS } from '@/constants/query-keys.constants';
import {
  HabitsQueryResult,
  HabitWithPoints,
  PageParam,
} from '@/types/habits.type';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
} from '../utils/user-level.utils';
import { useHabitsQuery } from '../queries/useHabitsQuery';
import { useUserPointsQuery } from '../queries/useUserPointsQuery';

export const useHabitRecords = (
  userId: string,
  initialHabits: HabitWithPoints[],
  initialTotalHabits: number,
  initialPoints: number,
) => {
  const queryClient = useQueryClient();
  const {
    data,
    isError: isHabitsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHabitsQuery(userId);
  const { data: totalPoints = initialPoints, isError: isPointsError } =
    useUserPointsQuery(userId);

  // habits를 페이지에서 평평하게 펼침
  const habits = useMemo(() => {
    return (
      data?.pages.flatMap((page: HabitsQueryResult) => page.habits) ??
      initialHabits
    );
  }, [data, initialHabits]);

  // totalHabits 계산: data가 있으면 첫 페이지의 totalHabits 사용, 없으면 initialTotalHabits
  const totalHabits = useMemo(() => {
    return data?.pages[0]?.totalHabits ?? initialTotalHabits;
  }, [data, initialTotalHabits]);

  const levelInfo = useMemo(() => {
    return {
      level: getUserLevel(totalPoints),
      expPercent: getExpPercent(totalPoints),
      currentExp: getCurrentExp(totalPoints),
    };
  }, [totalPoints]);

  // 초기 데이터를 쿼리 캐시에 설정
  useEffect(() => {
    queryClient.setQueryData<InfiniteData<HabitsQueryResult, PageParam>>(
      QUERY_KEYS.HABITS(userId),
      {
        pages: [
          {
            habits: initialHabits,
            totalHabits: initialTotalHabits,
            nextSkip: initialHabits.length,
          },
        ],
        pageParams: [{ skip: 0, take: 5 }],
      },
    );
  }, [queryClient, userId, initialHabits, initialTotalHabits]);

  return {
    habits,
    totalHabits, // 추가
    totalPoints,
    isError: isHabitsError || isPointsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...levelInfo,
  };
};
