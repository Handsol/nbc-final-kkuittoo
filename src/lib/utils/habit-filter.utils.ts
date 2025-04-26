import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { getCurrentDayStatus } from './habit-date.utils';
import { isCooldownActive } from './habit-points.utils';
import { DAYS_OF_WEEK } from '@/constants/habits.constants';

/**
 * 습관 목록을 선택된 요일과 카테고리에 따라 필터링하는 유틸리티 함수
 * @param habits - 필터링할 습관 객체 배열
 * @param selectedDay - 선택된 요일 문자열 배열 (예: ['mon', 'wed'])
 * @param selectedCategory - 선택된 카테고리 (null일 경우 카테고리 필터링 X)
 * @returns 필터링된 습관 객체 배열
 */
export const filterHabits = (
  habits: HabitWithPoints[],
  selectedDay: (typeof DAYS_OF_WEEK)[number][],
  selectedCategory: Categories | null,
): HabitWithPoints[] => {
  let filtered = habits;
  if (selectedDay.length > 0 && selectedDay.length < 7) {
    filtered = filtered.filter((habit) =>
      selectedDay.some((day) => habit[day as keyof HabitWithPoints] === true),
    );
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
