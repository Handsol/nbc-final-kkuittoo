import { useState } from 'react';

export const useHabitsControls = () => {
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return {
    isCreating,
    handleToggleCreate,
  };
};
