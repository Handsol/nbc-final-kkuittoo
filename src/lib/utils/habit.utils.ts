import { ONE_HOUR_COOLDOWN_MS } from '@/constants/habits.constants';
import { Habit, UserPoint } from '@prisma/client';

export const getCurrentDayStatus = (habit: Habit) => {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const days = [
    habit.sun,
    habit.mon,
    habit.tue,
    habit.wed,
    habit.thu,
    habit.fri,
    habit.sat,
  ];
  return days[dayOfWeek];
};

export const getCooldownStatus = (userPoints: UserPoint[]) => {
  const now = new Date();
  const lastPoint = userPoints
    .filter((up) => up.getTime !== null)
    .sort(
      (a, b) => new Date(b.getTime!).getTime() - new Date(a.getTime!).getTime(),
    )[0];

  return lastPoint
    ? now.getTime() <
        new Date(lastPoint.getTime!).getTime() + ONE_HOUR_COOLDOWN_MS
    : false;
};

export const getInitialSelectedDays = (habit?: Habit) => {
  if (!habit) return [];
  return ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].filter(
    (day) => habit[day as keyof Habit],
  );
};
