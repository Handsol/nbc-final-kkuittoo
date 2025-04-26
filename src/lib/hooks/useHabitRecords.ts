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
import { Categories } from '@prisma/client';
import { filterHabits } from '../utils/habit-filter.utils';

export const useHabitRecords = (
  userId: string,
  initialHabits: HabitWithPoints[],
  initialTotalHabits: number,
  initialPoints: number,
  selectedDay: string[],
  selectedCategory: Categories | null,
) => {
  const queryClient = useQueryClient();
  const {
    data,
    isError: isHabitsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHabitsQuery(userId, selectedDay, selectedCategory);
  const { data: totalPoints = initialPoints, isError: isPointsError } =
    useUserPointsQuery(userId);

  const habits = useMemo(() => {
    const result =
      data?.pages.flatMap((page: HabitsQueryResult) => page.habits) ??
      initialHabits;
    return result;
  }, [data, initialHabits]);

  const totalHabits = useMemo(() => {
    const result = data?.pages[0]?.totalHabits ?? initialTotalHabits;
    return result;
  }, [data, initialTotalHabits]);

  const levelInfo = useMemo(() => {
    return {
      level: getUserLevel(totalPoints),
      expPercent: getExpPercent(totalPoints),
      currentExp: getCurrentExp(totalPoints),
    };
  }, [totalPoints]);

  useEffect(() => {
    queryClient.setQueryData<InfiniteData<HabitsQueryResult, PageParam>>(
      QUERY_KEYS.HABITS(userId, selectedDay, selectedCategory),
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
  }, [
    queryClient,
    userId,
    initialHabits,
    initialTotalHabits,
    selectedDay,
    selectedCategory,
  ]);

  return {
    habits,
    totalHabits,
    totalPoints,
    isError: isHabitsError || isPointsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...levelInfo,
  };
};
