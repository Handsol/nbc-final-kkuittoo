import Text from '@/components/common/Text';
import { HABIT_CATEGORY_LABELS } from '@/constants/habits.constants';
import { Categories } from '@prisma/client';

type HabitCategoryBadgeProps = { category: Categories };

const HabitCategoryBadge = ({ category }: HabitCategoryBadgeProps) => (
  <Text
    className="px-[6px] py-[2px] rounded-full bg-sub-light text-main text-body-xs font-medium shrink-0"
    aria-label={`카테고리 ${HABIT_CATEGORY_LABELS[category]}`}
  >
    {HABIT_CATEGORY_LABELS[category]}
  </Text>
);

export default HabitCategoryBadge;
