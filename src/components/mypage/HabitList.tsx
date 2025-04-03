import { Habit } from '@prisma/client';
import HabitItem from './HabitItem';

type HabitListProps = {
  habits: Habit[];
};

const HabitList = ({ habits }: HabitListProps) => {
  return (
    <div className="space-y-4">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </div>
  );
};

export default HabitList;
