import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';

type HabitFormTagsProps = {
  category: Categories;
  setCategory: (category: Categories) => void;
};

const HabitFormTags = ({ category, setCategory }: HabitFormTagsProps) => (
  <>
    <label className="block mb-2 text-xs font-semibold text-gray-700">
      Tags
    </label>
    <div className="flex flex-wrap gap-3">
      {HABIT_CATEGORIES.map((c) => (
        <label
          key={c}
          className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition ${
            category === c
              ? 'bg-slate-700 text-white'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="category"
            className="hidden"
            checked={category === c}
            onChange={() => setCategory(c)}
          />
          {HABIT_CATEGORY_LABELS[c]}
        </label>
      ))}
    </div>
  </>
);

export default HabitFormTags;
