import { ONE_HOUR_COOLDOWN_MS } from '@/constants/habits.constants';
import { HabitFormData } from '@/types/mypage.type';
import { Habit, UserPoint } from '@prisma/client';

/**
 * 현재 요일에 해당하는 습관 수행 여부를 반환하는 유틸리티 함수
 *
 * @param {Habit} habit - 확인할 habit
 * @returns {boolean} - 오늘이 습관 수행 요일인지 여부
 */
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

/**
 * 사용자의 가장 최근 포인트 기록을 기반으로 쿨다운 상태인지 여부를 판단하는 함수
 *
 * @param {UserPoint[]} userPoints - 사용자의 포인트 기록
 * @param {Date} now - 현재 시간 (비교 기준 시간)
 * @returns {boolean} - 쿨다운 상태면 true, 아니면 false
 */
export const isCooldownActive = (
  userPoints: UserPoint[],
  now: Date,
): boolean => {
  const lastPoint = userPoints
    .filter((up) => up.getTime !== null)
    .sort((a, b) => {
      if (a.getTime === null || b.getTime === null) return 0;
      return new Date(b.getTime).getTime() - new Date(a.getTime).getTime();
    })[0];

  if (!lastPoint || !lastPoint.getTime) return false;

  const lastTime = new Date(lastPoint.getTime);
  const oneHourLater = new Date(lastTime.getTime() + ONE_HOUR_COOLDOWN_MS);

  return now < oneHourLater;
};

/**
 * 최근 포인트 획득 시간을 기준으로 쿨다운 상태인지 확인하는 유틸리티 함수
 *
 * @param {UserPoint[]} userPoints - 유저의 포인트 이력 배열
 * @returns {boolean} - 아직 쿨다운 중이라면 true, 아니라면 false
 */
export const getCooldownStatus = (userPoints: UserPoint[]): boolean => {
  const now = new Date();
  return isCooldownActive(userPoints, now);
};

/**
 * 선택된 요일 목록을 반환하는 유틸리티 함수
 *
 * @param {Habit} [habit] - 선택된 요일 정보를 가진 습관 객체
 * @returns {string[]} - 선택된 요일 문자열 배열 (예: ['mon', 'wed'])
 */
export const getInitialSelectedDays = (habit?: Habit) => {
  if (!habit) return [];
  return ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].filter(
    (day) => habit[day as keyof Habit],
  );
};

/**
 * 요일 선택 토글하는 유틸리티 함수
 *
 * @param {string[]} days - 현재 선택된 요일 배열
 * @param {string} day - 토글할 요일
 * @returns {string[]} - 토글 결과 반영된 새로운 요일 배열
 */
export const toggleDay = (days: string[], day: string): string[] =>
  days.includes(day) ? days.filter((d) => d !== day) : [...days, day];

/**
 * habit 생성 또는 수정할 때 사용될 habit data 생성하는 유틸리티 함수
 *
 * @param {string} [id] - 습관 ID (수정 시 사용)
 * @returns {HabitFormData}
 */
export const createHabitData = (
  title: string,
  notes: string,
  selectedDays: string[],
  category: string,
  id?: string,
): HabitFormData => ({
  id: id || Math.random().toString(),
  title,
  notes,
  categories: category,
  mon: selectedDays.includes('mon'),
  tue: selectedDays.includes('tue'),
  wed: selectedDays.includes('wed'),
  thu: selectedDays.includes('thu'),
  fri: selectedDays.includes('fri'),
  sat: selectedDays.includes('sat'),
  sun: selectedDays.includes('sun'),
});
