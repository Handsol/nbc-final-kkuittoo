import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  const handleValueChange = (value: string) => {
    setSelectedCategory(value === 'ALL' ? null : (value as Categories));
  };

  return (
    <div className="relative min-w-[100px] max-w-full">
      <Select
        onValueChange={handleValueChange}
        value={selectedCategory || 'ALL'}
      >
        <SelectTrigger
          className="w-full px-[16px] py-[8px] text-body-lg border border-medium-gray rounded-lg focus:outline focus:ring-offset-0 focus:ring-2 focus:ring-main"
          aria-label="Category filter"
        >
          <SelectValue placeholder="ALL" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="ALL">ALL</SelectItem>
          {HABIT_CATEGORIES.map((c) => (
            <SelectItem key={c} value={c}>
              {HABIT_CATEGORY_LABELS[c]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default MobileCategoryFilter;
