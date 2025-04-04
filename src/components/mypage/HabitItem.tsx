'use client';

import { Habit } from '@prisma/client';

type HabitItemProps = {
  habit: Pick<Habit, 'id' | 'title' | 'notes'>;
};

const HabitItem = ({ habit }: HabitItemProps) => {
  const handleComplete = async () => {
    console.log('포인트추가');
  };

  return (
    <article className="flex items-center gap-4 p-4 border rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        className={
          'w-8 h-8 font-extrabold rounded-full flex items-center justify-center transition-colors  bg-gray-200 text-gray-800'
        }
        onClick={handleComplete}
      >
        +
      </button>
      <div className="flex-1">
        <h2 className="font-semibold text-gray-800 truncate">{habit.title}</h2>
        <p className="text-sm text-gray-600 truncate">{habit.notes}</p>
      </div>
    </article>
  );
};

export default HabitItem;
