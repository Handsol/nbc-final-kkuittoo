import { useState } from 'react';
import {
  DAYS_OF_WEEK,
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';

const HabitsFilter = () => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <>
      <article className="flex">
        {DAYS_OF_WEEK.map((day) => (
          <button
            key={day}
            onClick={() =>
              setSelectedDay((prev) => (prev === day ? null : day))
            }
            className={`flex-1 pb-2 text-sm transition border-b-4 font-dohyeon
              ${
                selectedDay === day
                  ? 'border-main text-main font-semibold'
                  : 'border-light-gray text-medium-gray'
              }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </button>
        ))}
      </article>

      <article className="flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition font-pretendard
            ${
              selectedCategory === null
                ? 'bg-main text-white'
                : 'bg-white text-dark-gray border-gray-300'
            }`}
        >
          ALL
        </button>
        {HABIT_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category ? null : category,
              )
            }
            className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition font-pretendard
              ${
                selectedCategory === category
                  ? 'bg-main text-white'
                  : 'bg-white text-dark-gray border-gray-300'
              }`}
          >
            {HABIT_CATEGORY_LABELS[category]}
          </button>
        ))}
      </article>
    </>
  );
};

export default HabitsFilter;
