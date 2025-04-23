import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { useEffect, useState } from 'react';
import { filterHabits } from '../utils/habit-filter.utils';
import { DAYS_OF_WEEK } from '@/constants/habits.constants';

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
  const [selectedDay, setSelectedDay] = useState<string[]>([...DAYS_OF_WEEK]);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );

  useEffect(() => {
    const filtered = filterHabits(habits, selectedDay, selectedCategory);
    onFilterChange(filtered);
  }, [habits, selectedDay, selectedCategory, onFilterChange]);

  return { selectedDay, setSelectedDay, selectedCategory, setSelectedCategory };
};

export default useHabitsFilter;
