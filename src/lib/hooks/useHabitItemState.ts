import { useEffect, useMemo, useState } from 'react';
import { HabitWithPoints } from '@/types/habits.type';
import {
  calculateTodayPoints,
  getCooldownStatus,
} from '../utils/habit-points.utils';
import { getHabitDaysString, isHabitDisabled } from '../utils/habit.utils';

export const useHabitItemState = (
  habit: HabitWithPoints,
  isAddPending: boolean,
) => {
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const todayPoints = useMemo(
    () => calculateTodayPoints(habit.userPoints),
    [habit.userPoints],
  );
  const isDisabled = useMemo(
    () => isHabitDisabled(habit, isAddPending),
    [habit, isAddPending],
  );
  const daysString = useMemo(() => getHabitDaysString(habit), [habit]);

  // 실시간 쿨다운 카운트다운
  useEffect(() => {
    const { isActive, remainingSeconds: initialSeconds } = getCooldownStatus(
      habit.userPoints,
      new Date(),
    );
    if (!isActive) {
      setRemainingSeconds(0);
      return;
    }

    setRemainingSeconds(initialSeconds);
    const interval = setInterval(() => {
      const { remainingSeconds: updatedSeconds } = getCooldownStatus(
        habit.userPoints,
        new Date(),
      );
      setRemainingSeconds(updatedSeconds);
      if (updatedSeconds <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [habit.userPoints]);

  return { todayPoints, isDisabled, daysString, remainingSeconds };
};
