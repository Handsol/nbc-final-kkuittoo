import { HabitWithPoints } from '@/types/habits.type';
import { Categories, Habit } from '@prisma/client';
import { getCurrentDayStatus, getToday } from './habit-date.utils';
import { getCooldownStatus } from './habit-points.utils';

export const filterHabits = (
  habits: HabitWithPoints[],
  selectedDay: string | null,
  selectedCategory: Categories | null,
): HabitWithPoints[] => {
  let filtered = [...habits];
  if (selectedDay) {
    filtered = filtered.filter((habit) => habit[selectedDay as keyof Habit]);
  }
  if (selectedCategory) {
    filtered = filtered.filter(
      (habit) => habit.categories === selectedCategory,
    );
  }
  return filtered;
};

/**
 * 습관이 활성화된 상태인지 확인(쿨다운 비활성화 및 오늘 수행 가능).
 * @param habit - 활성화 여부를 확인할 habit(객체)
 * @returns 활성화 여부 (쿨다운 없고 오늘 수행 가능 시 true)
 */
export const isEnabled = (habit: HabitWithPoints): boolean => {
  return !getCooldownStatus(habit.userPoints) && getCurrentDayStatus(habit);
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

/**
 * habit이 비활성화된 상태인지 확인
 * 쿨다운 활성화, 오늘 수행 불가, 또는 펜딩 중일 때 true를 반환
 * @param habit - 확인할 habit 객체
 * @param isAddPending - 포인트 추가 펜딩 여부
 * @returns 비활성화 여부
 */
export const isHabitDisabled = (
  habit: HabitWithPoints,
  isAddPending: boolean,
): boolean => {
  const isValidDay = getCurrentDayStatus(habit);
  const isCooldownActive = getCooldownStatus(habit.userPoints);
  return !isValidDay || isCooldownActive || isAddPending;
};
