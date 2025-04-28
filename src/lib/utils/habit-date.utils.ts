import { DAY_LABELS, DAYS_OF_WEEK } from '@/constants/habits.constants';
import { Habit } from '@prisma/client';

/**
 * 현재 날짜를 기반으로 시간 정보를 제거한 Date 객체를 반환
 * 날짜 비교 시 동일한 날짜를 기준으로 사용하기 위해 설계 - 시간까지 있으면 다른날짜로 생각할까봐
 * @returns {Date} - 오늘 날짜 객체를 반환 (시간은 00:00:00으로 설정 - 예를 들면 2025-04-15 00:00:00)
 */
export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

/**
 * 주어진 날짜가 오늘인지 확인
 * 입력된 Date 객체의 연도, 월, 일을 현재 날짜와 비교하여 동일한 날짜인지 판단
 * 시간 정보는 비교에서 제외되므로, 같은 날짜라면 시간과 관계없이 true를 반환
 * @param {Date} date - 비교할 날짜 객체
 * @returns {boolean} - 주어진 날짜가 오늘이면 true, 그렇지 않으면 false
 */
export const isToday = (date: Date): boolean => {
  const today = getToday();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

/**
 * 현재 요일에 해당하는 습관 수행 여부를 반환하는 유틸리티 함수
 * @param {Habit} habit - 확인할 habit
 * @returns {boolean} - 오늘이 습관 수행 요일인지 여부
 */
export const getCurrentDayStatus = (habit: Habit) => {
  const dayOfWeek = new Date().getDay(); // 0(일) ~ 6(토)
  const adjustedIndex = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return habit[DAYS_OF_WEEK[adjustedIndex]];
};

/**
 * 습관의 활성 요일 정보를 추출
 * @param habit - Prisma Habit 객체
 * @returns {key: string, label: string}[] - 활성화된 요일 정보 배열
 */
export const getActiveDays = (habit: Habit) => {
  return DAYS_OF_WEEK.map((key, index) => ({
    key,
    label: DAY_LABELS[index],
    isActive: habit[key],
  })).filter((day) => day.isActive);
};

/**
 * 주어진 요일 키가 오늘 요일인지 확인
 * @param key - 확인할 요일 키 (예: 'mon', 'tue')
 * @returns boolean - 오늘 요일이면 true
 */
export const isTodayDay = (key: string): boolean => {
  const today = new Date().getDay(); // 일요일(0) ~ 토요일(6)
  const adjustedTodayIndex = today === 0 ? 6 : today - 1; // 월요일(0)~일요일(6) 조정
  return DAYS_OF_WEEK[adjustedTodayIndex] === key;
};
