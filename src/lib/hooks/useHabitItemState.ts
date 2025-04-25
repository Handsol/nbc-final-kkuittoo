import { useMemo } from 'react';
import { HabitWithPoints } from '@/types/habits.type';
import { calculateTodayPoints } from '../utils/habit-points.utils';
import { getHabitDaysString, isHabitDisabled } from '../utils/habit.utils';

export const useHabitItemState = (
  habit: HabitWithPoints,
  isAddPending: boolean,
) => {
  const todayPoints = useMemo(
    () => calculateTodayPoints(habit.userPoints),
    [habit.userPoints],
  );
  const isDisabled = useMemo(
    () => isHabitDisabled(habit, isAddPending),
    [habit, isAddPending],
  );
  const daysString = useMemo(() => getHabitDaysString(habit), [habit]);

  return { todayPoints, isDisabled, daysString };
};
