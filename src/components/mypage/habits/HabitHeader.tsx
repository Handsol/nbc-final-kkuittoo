import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

type HabitHeaderProps = {
  habitsCount: number;
};

const HabitHeader = ({ habitsCount }: HabitHeaderProps) => {
  return (
    <header
      className="flex items-center justify-between "
      aria-label="Habit section header"
    >
      <div className="flex items-center gap-[24px]">
        <Title mode={TITLE_MODE.SECTION_TITLE}>MY HABITS</Title>
        <Text className="font-bold">({habitsCount})</Text>
      </div>
    </header>
  );
};

export default HabitHeader;
