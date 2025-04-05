import { useState } from 'react';
import { DAYS_OF_WEEK, HABIT_CATEGORIES } from '@/constants/habits.constants';
import { HabitFormData } from '@/types/mypage.type';

export const useHabitForm = (initialHabit?: HabitFormData) => {
  const [title, setTitle] = useState(initialHabit?.title || '');
  const [notes, setNotes] = useState(initialHabit?.notes || '');
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialHabit
      ? DAYS_OF_WEEK.filter(
          (day) => initialHabit[day as keyof typeof initialHabit],
        )
      : [],
  );
  const [category, setCategory] = useState(
    initialHabit?.categories || HABIT_CATEGORIES[0],
  );

  const resetForm = () => {
    setTitle(initialHabit?.title || '');
    setNotes(initialHabit?.notes || '');
    setSelectedDays(
      initialHabit
        ? DAYS_OF_WEEK.filter(
            (day) => initialHabit[day as keyof typeof initialHabit],
          )
        : [],
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
