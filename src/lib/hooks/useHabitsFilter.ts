import { Categories } from '@prisma/client';
import { useState } from 'react';
import { DAYS_OF_WEEK_ARRAY } from '@/constants/habits.constants';

type UseHabitsFilterReturn = {
  selectedDay: string[];
  setSelectedDay: (day: string[]) => void;
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};

const useHabitsFilter = (): UseHabitsFilterReturn => {
  const [selectedDay, setSelectedDay] = useState([...DAYS_OF_WEEK_ARRAY]);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );

  return {
    selectedDay,
    setSelectedDay,
    selectedCategory,
    setSelectedCategory,
  };
};

export default useHabitsFilter;
