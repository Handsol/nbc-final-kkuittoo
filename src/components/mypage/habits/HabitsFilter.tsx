import { useEffect, useState } from 'react';
import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';
import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './DayFilter';
import { filterHabits } from '@/lib/utils/habit.utils';
import SelectButton from './SelectButton';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';

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
        <SelectButton
          mode={SELECTBUTTON_MODE.CATEGORY}
          isSelected={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
        >
          ALL
        </SelectButton>
        {HABIT_CATEGORIES.map((c) => (
          <SelectButton
            key={c}
            mode={SELECTBUTTON_MODE.CATEGORY}
            isSelected={selectedCategory === c}
            onClick={() => setSelectedCategory(c)}
          >
            {HABIT_CATEGORY_LABELS[c]}
          </SelectButton>
        ))}
      </article>
    </div>
  );
};

export default HabitsFilter;
