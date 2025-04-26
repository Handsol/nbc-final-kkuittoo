import { HabitWithPoints } from '@/types/habits.type';
import { useEffect, useState } from 'react';

export const useHabitsControls = (initialHabits: HabitWithPoints[]) => {
  const [isCreating, setIsCreating] = useState(false);
  const [filteredHabits, setFilteredHabits] = useState(initialHabits);

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return {
    isCreating,
    filteredHabits,
    setFilteredHabits,
    handleToggleCreate,
  };
};
