import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { HabitWithPoints } from '@/types/habits.type';
import { useQueryClient } from '@tanstack/react-query';
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
  initialPoints: number,
) => {
  const queryClient = useQueryClient();
  const { data: habits = initialHabits, isError: isHabitsError } =
    useHabitsQuery(userId);
  const { data: totalPoints = initialPoints, isError: isPointsError } =
    useUserPointsQuery(userId);

  const levelInfo = useMemo(() => {
    return {
      level: getUserLevel(totalPoints),
      expPercent: getExpPercent(totalPoints),
      currentExp: getCurrentExp(totalPoints),
    };
  }, [totalPoints]);

  useEffect(() => {
    queryClient.setQueryData(QUERY_KEYS.HABITS(userId), initialHabits);
  }, [queryClient, userId, initialHabits]);

  return {
    habits,
    totalPoints,
    isError: isHabitsError || isPointsError,
    ...levelInfo,
  };
};
