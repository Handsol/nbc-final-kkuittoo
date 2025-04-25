'use client';

import Text from '../common/Text';
import HabitHeader from './habits/HabitHeader';
import HabitList from './habits/HabitList';
import HabitsFilter from './habits/HabitsFilter';
import UserLevelProgress from './habits/UserLevelProgress';
import { HabitWithPoints } from '@/types/habits.type';
import { useHabitsControls } from '@/lib/hooks/useHabitsControls';
import { useHabitRecords } from '@/lib/hooks/useHabitRecords';

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
  const {
    habits,
    totalHabits, // 추가
    isError,
    level,
    expPercent,
    currentExp,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useHabitRecords(userId, initialHabits, initialTotalHabits, initialPoints);
  const { isCreating, filteredHabits, setFilteredHabits, handleToggleCreate } =
    useHabitsControls(habits);

  if (isError) {
    return <Text>데이터를 불러오는 데 실패했습니다.</Text>;
  }

  return (
    <div className="flex flex-col h-full px-4 md:px-[40px] gap-[32px]">
      <HabitHeader
        habitsCount={totalHabits}
        filteredCount={filteredHabits.length}
      />
      <UserLevelProgress
        level={level}
        expPercent={expPercent}
        currentPoints={currentExp}
      />
      <HabitsFilter
        habits={habits}
        onFilterChange={setFilteredHabits}
        onToggleCreate={handleToggleCreate}
        isCreating={isCreating}
      />
      <div className="flex-1 overflow-hidden">
        <HabitList
          userId={userId}
          habits={filteredHabits}
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
