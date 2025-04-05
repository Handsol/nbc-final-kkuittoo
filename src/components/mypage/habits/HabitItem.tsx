import { useState } from 'react';
import { Habit, UserPoint } from '@prisma/client';
import { useAddPointMutation } from '@/lib/mutations/use-add-point-mutation';
import HabitForm from './HabitForm';
import {
  getCooldownStatus,
  getCurrentDayStatus,
} from '@/lib/utils/habit.utils';

type HabitItemProps = {
  habit: Habit & { userPoints: UserPoint[] };
  userId: string;
};

const HabitItem = ({ habit, userId }: HabitItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const addPointMutation = useAddPointMutation(userId);

  const handleAddPoint = () => {
    addPointMutation.mutate(habit.id);
  };

  const handleUpdateHabit = (
    updatedHabit: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
  ) => {
    console.log('수정 완료', habit.id, updatedHabit);
    setIsEditing(false);
  };

  const handleDeleteHabit = () => {
    console.log('삭제', habit.id);
  };

  const isValidDay = getCurrentDayStatus(habit);
  const isCooldownActive = getCooldownStatus(habit.userPoints);
  const isDisabled =
    !isValidDay || isCooldownActive || addPointMutation.isPending;

  return (
    <div className="flex flex-col gap-2">
      <article className="flex items-center gap-4 p-4 border rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
        <button
          className={`w-9 h-9 font-extrabold rounded-full flex items-center justify-center text-lg transition-colors shrink-0 ${
            isDisabled
              ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={handleAddPoint}
          disabled={isDisabled}
        >
          +
        </button>

        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-gray-800 truncate">
            {habit.title}
          </h2>
          <p className="text-sm text-gray-600 truncate">{habit.notes}</p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            className="w-9 h-9 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            onClick={() => setIsEditing(!isEditing)}
          >
            수정
          </button>
          <button
            className="w-9 h-9 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
            onClick={handleDeleteHabit}
          >
            삭제
          </button>
        </div>
      </article>

      {isEditing && (
        <HabitForm
          initialHabit={habit}
          onCancel={() => setIsEditing(false)}
          onSuccess={handleUpdateHabit}
        />
      )}
    </div>
  );
};

export default HabitItem;
