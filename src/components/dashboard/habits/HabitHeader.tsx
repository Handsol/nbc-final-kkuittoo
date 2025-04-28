import { CommonLoadingSpinner } from '@/components/common/CommonLoadingSpinner';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

type HabitHeaderProps = {
  habitsCount: number;
  filteredCount?: number;
  isInitialLoading: boolean;
};
const HabitHeader = ({
  habitsCount,
  filteredCount,
  isInitialLoading,
}: HabitHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-[4px] font-bold">
        <Title mode={TITLE_MODE.SECTION_TITLE}>나의 습관</Title>
        {isInitialLoading ? (
          <CommonLoadingSpinner size={16} />
        ) : (
          <Text>
            ({filteredCount ?? habitsCount}/{habitsCount})
          </Text>
        )}
      </div>
    </header>
  );
};

export default HabitHeader;
