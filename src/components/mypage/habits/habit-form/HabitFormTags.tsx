import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';
import SelectButton from '../SelectButton';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';

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
        <SelectButton
          key={c}
          mode={SELECTBUTTON_MODE.CATEGORY}
          isSelected={category === c}
          onClick={() => setCategory(c)}
          name="category"
        >
          {HABIT_CATEGORY_LABELS[c]}
        </SelectButton>
      ))}
    </div>
  </>
);

export default HabitFormTags;
