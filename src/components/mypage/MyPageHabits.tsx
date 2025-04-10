'use client';

import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';
import Text from '../common/Text';
import { useState } from 'react';
import HabitHeader from './habits/HabitHeader';
import HabitLevelProgress from './habits/HabitLevelProgress';
import HabitList from './habits/HabitList';
import HabitsFilter from './habits/HabitsFilter';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { data: habits = [], isPending } = useHabitsQuery(userId);

  const handleToggleCreate = () => setIsCreating((prev) => !prev);

  if (isPending) return <Text>로딩중</Text>;

  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col gap-4">
      <HabitHeader
        userId={userId}
        habitsCount={habits.length}
        onToggleCreate={handleToggleCreate}
        isCreating={isCreating}
      />

      <HabitLevelProgress habits={habits} />

      <HabitsFilter />

      <HabitList
        habits={habits}
        userId={userId}
        isCreating={isCreating}
        onToggleCreate={handleToggleCreate}
      />
    </section>
  );
};

export default MyPageHabits;
