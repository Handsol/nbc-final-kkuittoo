import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './habit-filter/DayFilter';
import CategoryFilter from './habit-filter/CetegoryFilter';
import useHabitsFilter from '@/lib/hooks/useHabitsFilter';

type HabitsFilterProps = {
  habits: HabitWithPoints[];
  onFilterChange: (filteredHabits: HabitWithPoints[]) => void;
};

const HabitsFilter = ({ habits, onFilterChange }: HabitsFilterProps) => {
  const { selectedDay, setSelectedDay, selectedCategory, setSelectedCategory } =
    useHabitsFilter(habits, onFilterChange);

  return (
    <div className="space-y-4">
      {/* 요일 필터 */}
      <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      {/* 카테고리 필터 */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </div>
  );
};

export default HabitsFilter;
