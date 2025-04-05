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
      {/* 메인 영역 */}
      <div className="flex-1 overflow-y-auto">
        {isCreating ? (
          //habit 생성
          <HabitForm onCancel={handleToggleCreate} />
        ) : habits.length > 0 ? (
          //habit 있을 때
          <HabitList habits={habits} userId={userId} />
        ) : (
          //habit 없을 때
          <div className="h-full flex items-center justify-center text-gray-500">
            등록된 habit이 없습니다.
          </div>
        )}
      </div>
      {/* 추가 버튼  */}
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
