import { HabitWithPoints } from '@/types/habits.type';
import { getCurrentDayStatus } from './habit-date.utils';
import { getCooldownStatus } from './habit-points.utils';
import { DAY_LABELS_KO, DAYS_OF_WEEK } from '@/constants/habits.constants';
import { Habit } from '@prisma/client';

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

/**
 * 습관의 활성 요일을 한국어 문자열로 변환
 */
export const getHabitDaysString = (habit: Habit): string => {
  const activeDays = DAY_LABELS_KO.filter(
    (_, index) => habit[DAYS_OF_WEEK[index] as keyof Habit],
  );
  return activeDays.join(', ');
};

/**
 * 습관의 기본 정보 추출
 */
export const getHabitBasicInfo = (habit: Habit) => ({
  id: habit.id,
  title: habit.title,
  notes: habit.notes,
  categories: habit.categories,
});
