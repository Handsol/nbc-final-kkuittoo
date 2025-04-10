import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
  MAX_EXP,
} from '@/lib/utils/user-level.utils';
import UserLevel from '../profile/UserLevel';
import UserProgress from '../profile/UserProgress';
import { HabitWithPoints } from '@/types/habits.type';

type HabitLevelProgressProps = {
  habits: HabitWithPoints[];
};

const HabitLevelProgress = ({ habits }: HabitLevelProgressProps) => {
  const totalPoints = habits.reduce((sum, habit) => {
    return sum + (habit.userPoints?.reduce((acc, p) => acc + p.points, 0) || 0);
  }, 0);

  const level = getUserLevel(totalPoints);
  const currentExp = getCurrentExp(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  return (
    <article className="flex items-end gap-2">
      <UserLevel level={level} />
      <UserProgress
        currentExp={currentExp}
        maxExp={MAX_EXP}
        value={expPercent}
      />
    </article>
  );
};
export default HabitLevelProgress;
