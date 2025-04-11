import { getExpPercent, getUserLevel } from '@/lib/utils/user-level.utils';
import UserLevel from '../profile/UserLevel';
import { HabitWithPoints } from '@/types/habits.type';
import { Progress } from '@/components/ui/progress';
import { UserPoint } from '@prisma/client';

type HabitLevelProgressProps = {
  habits: HabitWithPoints[];
  userPoints?: UserPoint[];
};

const HabitLevelProgress = ({
  habits,
  userPoints,
}: HabitLevelProgressProps) => {
  // habits에 연결된 포인트 + 연결되지 않은 포인트 모두 합산
  const habitsPoints = habits.reduce((sum, habit) => {
    return sum + (habit.userPoints?.reduce((acc, p) => acc + p.points, 0) || 0);
  }, 0);

  const orphanPoints =
    userPoints
      ?.filter((p) => !p.habitId) // habitId가 없는 포인트
      .reduce((sum, point) => sum + point.points, 0) || 0;

  const totalPoints = habitsPoints + orphanPoints;

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
