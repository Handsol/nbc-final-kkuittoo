'use client';

import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';
import HabitContent from './habits/HabitContent';
import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '../common/Title';
import Text from '../common/Text';
import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
  MAX_EXP,
} from '@/lib/utils/user-level.utils';
import UserLevel from './profile/UserLevel';
import UserProgress from './profile/UserProgress';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const { data: habits = [], isPending } = useHabitsQuery(userId);

  if (isPending) return <Text>로딩중</Text>;

  const totalPoints = habits.reduce((sum, habit) => {
    return sum + (habit.userPoints?.reduce((acc, p) => acc + p.points, 0) || 0);
  }, 0);

  const level = getUserLevel(totalPoints);
  const currentExp = getCurrentExp(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Title mode={TITLE_MODE.SECTION_TITLE} className="text-xl font-bold">
          HABITS
        </Title>
        <Text className="text-sm">({habits.length}/10)</Text>
      </div>
      <div className="flex items-end gap-2">
        <UserLevel level={level} />
        <UserProgress
          currentExp={currentExp}
          maxExp={MAX_EXP}
          value={expPercent}
        />
      </div>
      <HabitContent habits={habits} userId={userId} />
    </section>
  );
};

export default MyPageHabits;
