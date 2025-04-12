import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';
import HabitSelectButton from '../habit-filter/HabitSelectButton';

type HabitFormTagsProps = {
  category: Categories;
  setCategory: (category: Categories) => void;
};

const HabitFormTags = ({ category, setCategory }: HabitFormTagsProps) => (
  <>
    <label className="block mb-2 text-xs font-semibold text-dark-gray font-dohyeon">
      Tags
    </label>
    <div className="flex flex-wrap gap-3">
      {HABIT_CATEGORIES.map((c) => (
        <HabitSelectButton
          key={c}
          mode={SELECTBUTTON_MODE.CATEGORY}
          isSelected={category === c}
          onClick={() => setCategory(c)}
          name="category"
        >
          {HABIT_CATEGORY_LABELS[c]}
        </HabitSelectButton>
      ))}
    </div>
  </>
);

export default HabitFormTags;
