import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

type HabitHeaderProps = {
  habitsCount: number;
  filteredCount?: number;
};
const HabitHeader = ({ habitsCount, filteredCount }: HabitHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-[4px]">
        <Title mode={TITLE_MODE.SECTION_TITLE}>My Habits</Title>
        <Text className="font-bold">
          ({filteredCount ?? habitsCount}/{habitsCount})
        </Text>
      </div>
    </header>
  );
};

export default HabitHeader;
