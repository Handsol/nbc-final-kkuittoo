'use client';

import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';
import Text from '../common/Text';
import { useEffect, useState } from 'react';
import HabitHeader from './habits/HabitHeader';
import HabitList from './habits/HabitList';
import HabitsFilter from './habits/HabitsFilter';
import UserLevelProgress from './habits/UserLevelProgress';
import { HabitWithPoints } from '@/types/habits.type';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const { data, isPending } = useHabitsQuery(userId);
  const habits = data?.habits || [];

  const [filteredHabits, setFilteredHabits] =
    useState<HabitWithPoints[]>(habits);

  const handleToggleCreate = () => setIsCreating((prev) => !prev);

  if (isPending) return <Text>로딩중</Text>;

  return (
    <section className="flex flex-col h-full p-6 gap-4">
      <HabitHeader
        habitsCount={habits.length}
        onToggleCreate={handleToggleCreate}
        isCreating={isCreating}
      />

      <UserLevelProgress userId={userId} />

      <HabitsFilter habits={habits} onFilterChange={setFilteredHabits} />

      <div className="flex-1 overflow-hidden">
        <HabitList
          habits={filteredHabits}
          userId={userId}
          isCreating={isCreating}
          onToggleCreate={handleToggleCreate}
        />
      </div>
    </section>
  );
};

export default MyPageHabits;
