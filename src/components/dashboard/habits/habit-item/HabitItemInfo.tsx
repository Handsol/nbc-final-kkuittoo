import { Habit, UserPoint } from '@prisma/client';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import { TITLE_MODE } from '@/constants/mode.constants';

type HabitItemInfoProps = {
  habit: Habit & { userPoints: UserPoint[] };
};

const HabitItemInfo = ({ habit }: HabitItemInfoProps) => (
  <div className="flex-1 min-w-0" aria-label="Habit details">
    <Title mode={TITLE_MODE.LINK}>{habit.title}</Title>
    <Text className="text-sm text-medium-gray truncate">{habit.notes}</Text>
  </div>
);

export default HabitItemInfo;
