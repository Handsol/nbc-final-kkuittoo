'use client';

import { useHabitsQuery } from '@/lib/queries/habits.queries';
import HabitHeader from './habits/HabitHeader';
import HabitContent from './habits/HabitContent';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const { data: habits = [] } = useHabitsQuery(userId);
  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col">
      <HabitHeader habitsLength={habits.length} />
      <HabitContent habits={habits} userId={userId} />
    </section>
  );
};

export default MyPageHabits;
