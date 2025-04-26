import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './habit-filter/DayFilter';
import CategoryFilter from './habit-filter/CetegoryFilter';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import MobileCategoryFilter from './habit-filter/MobileCategoryFilter';
import { Categories } from '@prisma/client';

type HabitsFilterProps = {
  habits: HabitWithPoints[];
  onFilterChange: (filteredHabits: HabitWithPoints[]) => void;
  isCreating: boolean;
  onToggleCreate: () => void;
  selectedDay: string[];
  setSelectedDay: (day: string[]) => void;
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};

const HabitsFilter = ({
  isCreating,
  onToggleCreate,
  selectedDay,
  setSelectedDay,
  selectedCategory,
  setSelectedCategory,
}: HabitsFilterProps) => {
  return (
    <div className="flex flex-col gap-[16px] md:gap-[24px]">
      <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      <div className="flex flex-row gap-[16px] justify-between">
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
