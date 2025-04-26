'use client';

import Text from '../common/Text';
import HabitHeader from './habits/HabitHeader';
import HabitList from './habits/HabitList';
import HabitsFilter from './habits/HabitsFilter';
import UserLevelProgress from './habits/UserLevelProgress';
import { HabitWithPoints } from '@/types/habits.type';
import { useHabitsControls } from '@/lib/hooks/useHabitsControls';
import { useHabitRecords } from '@/lib/hooks/useHabitRecords';
import useHabitsFilter from '@/lib/hooks/useHabitsFilter';
import { useEffect } from 'react';

type DashboardHabitsProps = {
  userId: string;
  initialHabits: HabitWithPoints[];
  initialTotalHabits: number;
  initialPoints: number;
};

const DashboardHabits = ({
  userId,
  initialHabits,
  initialTotalHabits,
  initialPoints,
}: DashboardHabitsProps) => {
  const { selectedDay, setSelectedDay, selectedCategory, setSelectedCategory } =
    useHabitsFilter();

  const {
    habits,
    totalHabits,
    isError,
    level,
    expPercent,
    currentExp,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHabitRecords(
    userId,
    initialHabits,
    initialTotalHabits,
    initialPoints,
    selectedDay,
    selectedCategory,
  );

  const { isCreating, handleToggleCreate } = useHabitsControls();

  if (isError) {
    return <Text>데이터를 불러오는 데 실패했습니다.</Text>;
  }

  return (
    <div className="flex flex-col h-full px-4 md:px-[40px] gap-[32px]">
      <HabitHeader habitsCount={totalHabits} filteredCount={habits.length} />
      <UserLevelProgress
        level={level}
        expPercent={expPercent}
        currentPoints={currentExp}
      />
      <HabitsFilter
        habits={habits}
        onFilterChange={() => {}} // 서버 측 필터링 사용으로 no-op
        isCreating={isCreating}
        onToggleCreate={handleToggleCreate}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex-1 overflow-hidden">
        <HabitList
          userId={userId}
          habits={habits}
          isCreating={isCreating}
          onToggleCreate={handleToggleCreate}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </div>
  );
};

export default DashboardHabits;
