import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import HabitForm from './HabitForm';
import HabitList from './HabitList';

type HabitContentProps = {
  habits: (Habit & { userPoints: UserPoint[] })[];
  userId: string;
};

const HabitContent = ({ habits, userId }: HabitContentProps) => {
  const [isCreating, setIsCreating] = useState(false);

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto">
        {isCreating ? (
          <HabitForm onCancel={handleToggleCreate} />
        ) : habits.length > 0 ? (
          <HabitList habits={habits} userId={userId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            등록된 habit이 없습니다.
          </div>
        )}
      </div>
      <div className="mt-4 w-full">
        <button
          className="w-full py-2 bg-gray-700 text-white rounded-full"
          onClick={handleToggleCreate}
        >
          Add Habit
        </button>
      </div>
    </>
  );
};

export default HabitContent;
