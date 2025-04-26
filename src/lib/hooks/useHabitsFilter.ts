import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { useEffect, useState } from 'react';
import { filterHabits } from '../utils/habit-filter.utils';
import { DAYS_OF_WEEK, DAYS_OF_WEEK_ARRAY } from '@/constants/habits.constants';

type UseHabitsFilterReturn = {
  selectedDay: string[];
  setSelectedDay: (day: string[]) => void;
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};

const useHabitsFilter = (
  habits: HabitWithPoints[],
  onFilterChange: (filteredHabits: HabitWithPoints[]) => void,
): UseHabitsFilterReturn => {
  const [selectedDay, setSelectedDay] = useState<string[]>([
    ...DAYS_OF_WEEK_ARRAY,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );

  useEffect(() => {
    // 서버에서 필터링된 habits 사용
    onFilterChange(habits);
  }, [habits, onFilterChange]);

  return { selectedDay, setSelectedDay, selectedCategory, setSelectedCategory };
};

export default useHabitsFilter;
