import UserLevel from '../profile/UserLevel';
import { Progress } from '@/components/ui/progress';

type UserLevelProgressProps = {
  level: number;
  expPercent: number;
};

const UserLevelProgress = ({ level, expPercent }: UserLevelProgressProps) => {
  return (
    <div className="flex items-center gap-[8px]">
      <UserLevel level={level} />
      <Progress value={expPercent} className="w-full h-[20px]" />
    </div>
  );
};

export default UserLevelProgress;
