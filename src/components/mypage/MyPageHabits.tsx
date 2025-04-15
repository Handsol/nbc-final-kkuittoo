'use client';

import Text from '../common/Text';
import HabitHeader from './habits/HabitHeader';
import HabitList from './habits/HabitList';
import HabitsFilter from './habits/HabitsFilter';
import UserLevelProgress from './habits/UserLevelProgress';
import { HabitWithPoints } from '@/types/habits.type';
import { useHabitsControls } from '@/lib/hooks/useHabitsControls';
import { useHabitRecords } from '@/lib/hooks/useHabitRecords';

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
  const { habits, isError, level, expPercent } = useHabitRecords(
    userId,
    initialHabits,
    initialPoints,
  );
  const { isCreating, filteredHabits, setFilteredHabits, handleToggleCreate } =
    useHabitsControls(initialHabits);

  if (isError) {
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
