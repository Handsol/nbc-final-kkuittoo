import { HabitWithPoints } from '@/types/habits.type';
import DayFilter from './habit-filter/DayFilter';
import CategoryFilter from './habit-filter/CetegoryFilter';
import useHabitsFilter from '@/lib/hooks/useHabitsFilter';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { useMediaQuery } from '@/lib/hooks/useMediaQuery';
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
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="flex flex-col gap-[16px] md:gap-[24px]">
      {/* 요일 필터 */}
      <DayFilter selectedDay={selectedDay} setSelectedDay={setSelectedDay} />

      <div className="flex flex-row gap-[16px] justify-between">
        {/* 모바일과 데스크탑 다른 카테고리 필터 */}
        {isMobile ? (
          <MobileCategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        ) : (
          <CategoryFilter
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

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
