import { HabitWithPoints } from '@/types/habits.type';
import { getCurrentDayStatus } from './habit-date.utils';
import { isCooldownActive } from './habit-points.utils';

/**
 * 습관이 활성화된 상태인지 확인(쿨다운 비활성화 및 오늘 수행 가능).
 * @param habit - 활성화 여부를 확인할 habit(객체)
 * @returns 활성화 여부 (쿨다운 없고 오늘 수행 가능 시 true)
 */
export const isEnabled = (habit: HabitWithPoints): boolean => {
  return (
    !isCooldownActive(habit.userPoints, new Date()) &&
    getCurrentDayStatus(habit)
  );
};

/**
 * habit list를 활성화 상태 기준으로 정렬
 * 활성화된 habit(쿨다운 없고 오늘 수행 가능)이 위쪽에 배치
 * @param habits - 정렬할 habit 목록
 * @returns 정렬된 habit 목록 (새 배열)
 */
export const sortHabitsByEnabled = (
  habits: HabitWithPoints[],
): HabitWithPoints[] => {
  return [...habits].sort((a, b) => {
    const aEnabled = isEnabled(a);
    const bEnabled = isEnabled(b);
    return aEnabled === bEnabled ? 0 : aEnabled ? -1 : 1;
  });
};

// 현재 요일에 따라 정렬
export const getCurrentDayField = (): string => {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const today = new Date().getDay(); // 0: 일요일, 1: 월요일, ...
  return daysOfWeek[today];
};
