'use client';

import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';
import Text from '../common/Text';
import { useEffect, useState } from 'react';
import HabitHeader from './habits/HabitHeader';
import HabitList from './habits/HabitList';
import HabitsFilter from './habits/HabitsFilter';
import UserLevelProgress from './habits/UserLevelProgress';
import { HabitWithPoints } from '@/types/habits.type';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { getExpPercent, getUserLevel } from '@/lib/utils/user-level.utils';
import { useUserPointsQuery } from '@/lib/queries/useUserPointsQuery';

type MyPageHabitsProps = {
  userId: string;
  initialHabits: HabitWithPoints[];
  initialPoints: number;
};

const MyPageHabits = ({
  userId,
  initialHabits,
  initialPoints,
}: MyPageHabitsProps) => {
  const queryClient = useQueryClient();
  const [isCreating, setIsCreating] = useState(false);
  const { data: habits = initialHabits, isError: isHabitsError } =
    useHabitsQuery(userId);
  const { data: totalPoints = initialPoints, isError: isPointsError } =
    useUserPointsQuery(userId);
  const [filteredHabits, setFilteredHabits] =
    useState<HabitWithPoints[]>(initialHabits);

  useEffect(() => {
    queryClient.setQueryData(QUERY_KEYS.HABITS(userId), initialHabits);
  }, [queryClient, userId, initialHabits]);

  const level = getUserLevel(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  const handleToggleCreate = () => setIsCreating((prev) => !prev);

  if (isHabitsError || isPointsError) {
    return <Text>데이터를 불러오는 데 실패했습니다.</Text>;
  }
  return (
    <div className="flex flex-col h-full p-6 gap-8">
      <HabitHeader
        habitsCount={habits.length}
        onToggleCreate={handleToggleCreate}
        isCreating={isCreating}
      />
      <UserLevelProgress level={level} expPercent={expPercent} />
      <HabitsFilter habits={habits} onFilterChange={setFilteredHabits} />
      <div className="flex-1 overflow-hidden">
        <HabitList
          userId={userId}
          habits={filteredHabits}
          isCreating={isCreating}
          onToggleCreate={handleToggleCreate}
        />
      </div>
    </div>
  );
};

export default MyPageHabits;
