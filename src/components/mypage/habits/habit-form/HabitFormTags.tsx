import { HABIT_CATEGORIES } from '@/constants/habits.constants';

type HabitFormTagsProps = {
  category: string;
  setCategory: (category: string) => void;
};

const HabitFormTags = ({ category, setCategory }: HabitFormTagsProps) => (
  <div>
    <label className="block mb-2 text-xs font-semibold text-gray-700">
      Tags
    </label>
    <div className="flex flex-wrap gap-3">
      {HABIT_CATEGORIES.map((cat) => (
        <label
          key={cat}
          className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition ${
            category === cat
              ? 'bg-slate-700 text-white'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="category"
            className="hidden"
            checked={category === cat}
            onChange={() => setCategory(cat)}
          />
          {cat}
        </label>
      ))}
    </div>
  </div>
);

export default HabitFormTags;
