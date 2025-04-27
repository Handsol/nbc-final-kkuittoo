import { HabitWithPoints } from '@/types/habits.type';
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
  // 습관 리스트 가져오기
  const {
    data,
    isError: isHabitsError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHabitsQuery(userId, selectedDay, selectedCategory);

  // 사용자 포인트 가져오기
  const { data: totalPoints = initialPoints, isError: isPointsError } =
    useUserPointsQuery(userId);

  // 가져온 습관 데이터 정리
  const habits = useMemo(() => {
    if (!data) return sortHabitsByEnabled(initialHabits);

    const allHabits = data.pages
      .map((page) => page.habits)
      .reduce((all, habits) => [...all, ...habits], []);

    return sortHabitsByEnabled(allHabits);
  }, [data, initialHabits]);

  // 전체 습관 수
  const totalHabits = useMemo(() => {
    return data?.pages[0]?.totalHabits ?? initialTotalHabits;
  }, [data, initialTotalHabits]);

  // 레벨 관련 정보 계산
  const levelInfo = useMemo(
    () => ({
      level: getUserLevel(totalPoints),
      expPercent: getExpPercent(totalPoints),
      currentExp: getCurrentExp(totalPoints),
    }),
    [totalPoints],
  );

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
