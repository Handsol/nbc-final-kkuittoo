import UserLevel from '@/components/layout/profile/UserLevel';
import { Progress } from '@/components/ui/progress';

type UserLevelProgressProps = {
  level: number;
  expPercent: number;
};

export const UserLevelProgress = ({
  level,
  expPercent,
}: UserLevelProgressProps) => {
  return (
    <div className="flex items-center gap-[8px]">
      <UserLevel level={level} />
      <Progress value={expPercent} className="w-[264px] h-[20px]" />
    </div>
  );
};

export default UserLevelProgress;
