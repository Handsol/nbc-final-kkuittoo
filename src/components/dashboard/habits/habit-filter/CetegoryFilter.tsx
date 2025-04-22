import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';
import HabitSelectButton from './HabitSelectButton';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';

type CategoryFilterProps = {
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};

const CategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryFilterProps) => (
  <fieldset className="flex gap-[6px]" aria-label="Category filter">
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
  </fieldset>
);

export default CategoryFilter;
