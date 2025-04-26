import { HabitsQueryResult, HabitWithPoints } from '@/types/habits.type';
import { useMemo } from 'react';
import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
} from '../utils/user-level.utils';
import { useHabitsQuery } from '../queries/useHabitsQuery';
import { useUserPointsQuery } from '../queries/useUserPointsQuery';
import { Categories } from '@prisma/client';
import { sortHabitsByEnabled } from '../utils/habit-filter.utils';

export const useHabitRecords = (
  userId: string,
  initialHabits: HabitWithPoints[],
  initialTotalHabits: number,
  initialPoints: number,
  selectedDay: string[],
  selectedCategory: Categories | null,
) => {
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
    return sortHabitsByEnabled(result); // 여기서 정렬 적용
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
