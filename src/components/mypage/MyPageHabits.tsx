'use client';

import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';
import HabitContent from './habits/HabitContent';
import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '../common/Title';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const { data: habits = [] } = useHabitsQuery(userId);

  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Title mode={TITLE_MODE.SECTION_TITLE}>HABITS</Title>
        <span className="text-sm text-gray-500">({habits.length}/10)</span>
      </div>
      <HabitContent habits={habits} userId={userId} />
    </section>
  );
};

export default MyPageHabits;
