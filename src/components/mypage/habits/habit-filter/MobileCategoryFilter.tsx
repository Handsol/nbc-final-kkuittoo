import {
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';
import { Categories } from '@prisma/client';
import { FaCircleChevronDown } from 'react-icons/fa6';

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
    <div className="relative min-w-[100px] max-w-full">
      <select
        onChange={handleChange}
        value={selectedCategory || 'ALL'}
        className="w-full appearance-none pl-[16px] pr-[36px] py-[8px] text-body-md border border-medium-gray rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-main"
        aria-label="Category filter"
      >
        <option value="ALL">ALL</option>
        {HABIT_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {HABIT_CATEGORY_LABELS[c]}
          </option>
        ))}
      </select>

      <div className="pointer-events-none absolute inset-y-0 right-[12px] flex items-center text-main">
        <FaCircleChevronDown className="w-5 h-5" />
      </div>
    </div>
  );
};

export default MobileCategoryFilter;
