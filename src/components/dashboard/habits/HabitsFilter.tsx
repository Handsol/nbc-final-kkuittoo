import { FilterState } from '@/types/habits.type';
import DayFilter from './habit-filter/DayFilter';
import CategoryFilter from './habit-filter/CetegoryFilter';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import MobileCategoryFilter from './habit-filter/MobileCategoryFilter';

type HabitsFilterProps = {
  filterState: FilterState;
  isCreating: boolean;
  onToggleCreate: () => void;
};

const HabitsFilter = ({
  filterState,
  isCreating,
  onToggleCreate,
}: HabitsFilterProps) => {
  return (
    <div className="flex flex-col gap-[16px] md:gap-[24px]">
      <DayFilter
        selectedDay={filterState.selectedDay}
        setSelectedDay={filterState.setSelectedDay}
      />
      <div className="flex flex-row gap-[16px] justify-between">
        <div className="block md:hidden">
          <MobileCategoryFilter
            selectedCategory={filterState.selectedCategory}
            setSelectedCategory={filterState.setSelectedCategory}
          />
        </div>
        <div className="hidden md:block">
          <CategoryFilter
            selectedCategory={filterState.selectedCategory}
            setSelectedCategory={filterState.setSelectedCategory}
          />
        </div>
        <ActionButton
          mode={ACTIONBUTTON_MODE.ROUNDED_MD}
          onClick={onToggleCreate}
          disabled={isCreating}
        >
          습관 추가하기
        </ActionButton>
      </div>
    </div>
  );
};

export default HabitsFilter;
