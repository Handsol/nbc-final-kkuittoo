import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
} from '@/lib/utils/user-level.utils';
import UserLevel from '../profile/UserLevel';
import { HabitWithPoints } from '@/types/habits.type';
import { Progress } from '@/components/ui/progress';

type HabitLevelProgressProps = {
  habits: HabitWithPoints[];
};

const HabitLevelProgress = ({ habits }: HabitLevelProgressProps) => {
  const totalPoints = habits.reduce((sum, habit) => {
    return sum + (habit.userPoints?.reduce((acc, p) => acc + p.points, 0) || 0);
  }, 0);

  const level = getUserLevel(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  return (
    <article className="flex items-center gap-2">
      <UserLevel level={level} />
      <Progress value={expPercent} className="w-full h-5" />
    </article>
  );
};
export default HabitLevelProgress;
