import { useState } from 'react';
import {
  DAY_LABELS,
  DAYS_OF_WEEK,
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';

const HabitsFilter = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <div className="flex">
        {DAYS_OF_WEEK.map((day, idx) => (
          <button
            key={day}
            onClick={() =>
              setSelectedDay((prev) => (prev === day ? null : day))
            }
            className={`flex-1 pb-2 text-sm font-medium transition border-b-4
              ${
                selectedDay === day
                  ? 'border-slate-600 text-slate-800 font-semibold'
                  : 'border-gray-300 text-gray-500'
              }`}
          >
            {DAY_LABELS[idx]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition
            ${
              selectedCategory === null
                ? 'bg-slate-700 text-white'
                : 'bg-white text-gray-700 border-gray-300'
            }`}
        >
          전체
        </button>
        {HABIT_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category ? null : category,
              )
            }
            className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition
              ${
                selectedCategory === category
                  ? 'bg-slate-700 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
          >
            {HABIT_CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>
    </>
  );
};

export default HabitsFilter;
