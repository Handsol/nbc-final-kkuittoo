import { useEffect, useState } from 'react';
import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';
import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './DayFilter';
import { filterHabits } from '@/lib/utils/habit.utils';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';
import HabitSelectButton from './HabitSelectButton';

type HabitsFilterProps = {
  habits: HabitWithPoints[];
  onFilterChange: (filteredHabits: HabitWithPoints[]) => void;
};

const HabitsFilter = ({ habits, onFilterChange }: HabitsFilterProps) => {
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Categories | null>(
    null,
  );

  useEffect(() => {
    const filtered = filterHabits(habits, selectedDay, selectedCategory);
    onFilterChange(filtered);
  }, [habits, selectedDay, selectedCategory, onFilterChange]);

  return (
    <div className="space-y-4">
      {/* 요일 필터 */}
      <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      {/* 카테고리 필터 */}
      <article className="flex flex-wrap gap-3">
        <HabitSelectButton
          mode={SELECTBUTTON_MODE.CATEGORY}
          isSelected={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
        >
          ALL
        </HabitSelectButton>
        {HABIT_CATEGORIES.map((c) => (
          <HabitSelectButton
            key={c}
            mode={SELECTBUTTON_MODE.CATEGORY}
            isSelected={selectedCategory === c}
            onClick={() => setSelectedCategory(c)}
          >
            {HABIT_CATEGORY_LABELS[c]}
          </HabitSelectButton>
        ))}
      </article>
    </div>
  );
};

export default HabitsFilter;
