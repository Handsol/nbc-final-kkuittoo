import { useState } from 'react';
import { DAYS_OF_WEEK, HABIT_CATEGORIES } from '@/constants/habits.constants';
import { HabitFormData } from '@/types/mypage.type';

/**
 * habit form 관리를 위한 커스텀 훅
 * @param {HabitFormData} [initialHabit] - 초기 habit data - 생성일 땐 없고, 수정일 땐 존재
 * @returns {Object} -  폼 관리에 필요한 값들과 함수들
 * @property {Function} resetForm - 초기 상태로 habit form 리셋하는 함수
 */
export const useHabitForm = (initialHabit?: HabitFormData) => {
  const [title, setTitle] = useState(initialHabit?.title || '');
  const [notes, setNotes] = useState(initialHabit?.notes || '');
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialHabit ? DAYS_OF_WEEK.filter((day) => initialHabit[day]) : [],
  );
  const [category, setCategory] = useState(
    initialHabit?.categories || HABIT_CATEGORIES[0],
  );

  const resetForm = () => {
    setTitle(initialHabit?.title || '');
    setNotes(initialHabit?.notes || '');
    setSelectedDays(
      initialHabit ? DAYS_OF_WEEK.filter((day) => initialHabit[day]) : [],
    );
    setCategory(initialHabit?.categories || HABIT_CATEGORIES[0]);
  };

  return {
    title: {
      value: title,
      setValue: setTitle,
    },
    notes: {
      value: notes,
      setValue: setNotes,
    },
    selectedDays: {
      value: selectedDays,
      setValue: setSelectedDays,
    },
    category: {
      value: category,
      setValue: setCategory,
    },
    resetForm,
  };
};
