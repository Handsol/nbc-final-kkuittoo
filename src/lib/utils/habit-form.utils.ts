import {
  DAYS_OF_WEEK,
  DAYS_OF_WEEK_ARRAY,
  HABIT_CATEGORIES,
} from '@/constants/habits.constants';
import { HabitFormData } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { HabitFormSchema } from '../schema/habit.schema';

/**
 * 요일 선택 토글하는 유틸리티 함수
 * @param {string[]} days - 현재 선택된 요일 배열
 * @param {string} day - 토글할 요일
 * @returns {string[]} - 토글 결과 반영된 새로운 요일 배열
 */
export const toggleDay = (days: string[], day: string): string[] =>
  days.includes(day) ? days.filter((d) => d !== day) : [...days, day];

/**
 * habit 생성 또는 수정할 때 사용될 habit data 생성하는 유틸리티 함수
 * @param {string} [id] - 습관 ID (수정 시 사용)
 * @returns {HabitFormData}
 */
export const createHabitData = (
  title: string,
  notes: string,
  selectedDays: string[],
  category: Categories,
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

/**
 * react-hook-form에서 사용할 기본값
 * @param {HabitFormData} [habit] - 초기 습관 데이터 (수정일 경우 사용). 전달되지 않으면 빈 값으로 초기화
 * @returns {HabitFormSchema} - 폼 초기값
 */
export const getDefaultValues = (habit?: HabitFormData): HabitFormSchema => ({
  title: habit?.title || '',
  notes: habit?.notes || '',
  categories: habit?.categories || HABIT_CATEGORIES[0],
  selectedDays: habit
    ? DAYS_OF_WEEK.filter((day) => habit[day])
    : DAYS_OF_WEEK_ARRAY,
});

/**
 * 새로운 습관 데이터와 초기 습관 데이터가 동일한지 확인하는 유틸리티 함수
 * @param newData - 비교할 새로운 습관 데이터
 * @param initialHabit - 초기 습관 데이터 (선택적)
 * @returns 데이터가 동일하면 true, 그렇지 않으면 false
 */
export const isHabitDataUnchanged = (
  newData: HabitFormData,
  initialHabit?: HabitFormData,
): boolean => {
  if (!initialHabit) return false;
  return (
    DAYS_OF_WEEK.every((day) => newData[day] === initialHabit[day]) &&
    newData.title === initialHabit.title &&
    newData.notes === initialHabit.notes &&
    newData.categories === initialHabit.categories
  );
};
