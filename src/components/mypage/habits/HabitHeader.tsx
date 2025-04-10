import ActionButton from '@/components/common/button/ActionButton';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { ACTIONBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';

type HabitHeaderProps = {
  habitsCount: number;
  isCreating: boolean;
  onToggleCreate: () => void;
};

const HabitHeader = ({
  habitsCount,
  isCreating,
  onToggleCreate,
}: HabitHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Title mode={TITLE_MODE.SECTION_TITLE}>HABITS</Title>
        <Text>({habitsCount})</Text>
      </div>
      <ActionButton
        mode={ACTIONBUTTON_MODE.ROUNDED_MD}
        onClick={onToggleCreate}
        disabled={isCreating}
      >
        Add Habit
      </ActionButton>
    </header>
  );
};

export default HabitHeader;
