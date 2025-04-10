import ActionButton from '@/components/common/button/ActionButton';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { ACTIONBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';

type HabitHeaderProps = {
  userId: string;
  habitsCount: number;
  isCreating: boolean;
  onToggleCreate: () => void;
};

const HabitHeader = ({
  userId,
  habitsCount,
  isCreating,
  onToggleCreate,
}: HabitHeaderProps) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Title mode={TITLE_MODE.SECTION_TITLE} className="text-xl font-bold">
          HABITS
        </Title>
        <Text className="text-sm">({habitsCount}/10)</Text>
      </div>
      <ActionButton
        mode={ACTIONBUTTON_MODE.PRIMARY_SMALL}
        onClick={onToggleCreate}
        disabled={isCreating}
      >
        Add Habit
      </ActionButton>
    </header>
  );
};

export default HabitHeader;
