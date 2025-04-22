import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './habit-filter/DayFilter';
import CategoryFilter from './habit-filter/CetegoryFilter';
import useHabitsFilter from '@/lib/hooks/useHabitsFilter';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import MobileCategoryFilter from './habit-filter/MobileCategoryFilter';

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
    <div className="flex flex-col gap-[16px] md:gap-[24px]">
      {/* 요일 필터 */}
      <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <div className="flex flex-row gap-[16px] justify-between">
        {/* 모바일과 데스크탑 다른 카테고리 필터 */}
        <div className="block md:hidden">
          <MobileCategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <div className="hidden md:block">
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        <ActionButton
          mode={ACTIONBUTTON_MODE.ROUNDED_MD}
          onClick={onToggleCreate}
          disabled={isCreating}
        >
          habit 추가하기
        </ActionButton>
      </div>
    </div>
  );
};

export default HabitsFilter;
