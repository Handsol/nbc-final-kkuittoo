'use client';

import HabitContent from './habits/HabitContent';
import { fetchGetAllHabits } from '@/lib/services/habit-actions.services';
import { useQuery } from '@tanstack/react-query';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const { data: habits = [] } = useQuery({
    queryKey: ['habits', userId],
    queryFn: () => fetchGetAllHabits(userId),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <h1 className="text-xl font-bold text-gray-800">HABITS</h1>
        <span className="text-sm text-gray-500">({habits.length}/10)</span>
      </div>
      <HabitContent habits={habits} userId={userId} />
    </section>
  );
};

export default MyPageHabits;
