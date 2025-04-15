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
    <label className="block mb-2 text-body-md font-semibold text-dark-gray font-dohyeon">
      태그
    </label>
    <div className="flex flex-wrap gap-2">
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
