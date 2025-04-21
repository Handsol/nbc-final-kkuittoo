import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';

type MobileCategoryFilterProps = {
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};

const MobileCategoryFilter = ({
  selectedCategory,
  setSelectedCategory,
}: MobileCategoryFilterProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value === 'ALL' ? null : (value as Categories));
  };

  return (
    <select
      onChange={handleChange}
      value={selectedCategory || 'ALL'}
      className="w-[76px] p-2 border border-medium-gray rounded-lg"
      aria-label="Category filter"
    >
      <option value="ALL">ALL</option>
      {HABIT_CATEGORIES.map((c) => (
        <option key={c} value={c}>
          {HABIT_CATEGORY_LABELS[c]}
        </option>
      ))}
    </select>
  );
};

export default MobileCategoryFilter;
