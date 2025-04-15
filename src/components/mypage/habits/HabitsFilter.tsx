import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './habit-filter/DayFilter';
import CategoryFilter from './habit-filter/CetegoryFilter';
import useHabitsFilter from '@/lib/hooks/useHabitsFilter';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type HabitsFilterProps = {
  habits: HabitWithPoints[];
  onFilterChange: (filteredHabits: HabitWithPoints[]) => void;
  isCreating: boolean;
  onToggleCreate: () => void;
};

const HabitsFilter = ({
  habits,
  onFilterChange,
  isCreating,
  onToggleCreate,
}: HabitsFilterProps) => {
  const { selectedDay, setSelectedDay, selectedCategory, setSelectedCategory } =
    useHabitsFilter(habits, onFilterChange);

  return (
    <div className="flex flex-col gap-[24px]">
      {/* 요일 필터 */}
      <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <div className="flex gap-[200px]">
        {/* 카테고리 필터 */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ActionButton
          mode={ACTIONBUTTON_MODE.ROUNDED_MD}
          onClick={onToggleCreate}
          disabled={isCreating}
        >
          Add Habit
        </ActionButton>
      </div>
    </div>
  );
};

export default HabitsFilter;
