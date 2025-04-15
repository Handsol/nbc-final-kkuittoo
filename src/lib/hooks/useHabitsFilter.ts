import { HabitWithPoints } from '@/types/habits.type';
import { Categories } from '@prisma/client';
import { useEffect, useState } from 'react';
import { filterHabits } from '../utils/habit-filter.utils';

type UseHabitsFilterReturn = {
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};

const useHabitsFilter = (
  habits: HabitWithPoints[],
  onFilterChange: (filteredHabits: HabitWithPoints[]) => void,
): UseHabitsFilterReturn => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
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
