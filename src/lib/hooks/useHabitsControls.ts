import { HabitWithPoints } from '@/types/habits.type';
import { useEffect, useState } from 'react';

export const useHabitsControls = (habits: HabitWithPoints[]) => {
  const [isCreating, setIsCreating] = useState(false);
  const [filteredHabits, setFilteredHabits] = useState(habits);

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  // habits가 변경될 때 filteredHabits 동기화
  useEffect(() => {
    setFilteredHabits(habits);
  }, [habits]);

  return {
    isCreating,
    filteredHabits,
    setFilteredHabits,
    handleToggleCreate,
  };
};
