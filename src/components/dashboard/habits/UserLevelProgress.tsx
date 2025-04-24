import Text from '@/components/common/Text';
import UserLevel from '@/components/layout/profile/UserLevel';
import { Progress } from '@/components/ui/progress';
import { MAX_EXP } from '@/lib/utils/user-level.utils';

type UserLevelProgressProps = {
  level: number;
  expPercent: number;
  currentPoints: number;
};

export const UserLevelProgress = ({
  level,
  expPercent,
  currentPoints,
}: UserLevelProgressProps) => {
  return (
    <article className="flex items-center gap-[8px] w-full">
      <UserLevel level={level} />
      <div className="flex-1 flex items-center gap-[4px]">
        <Progress value={expPercent} className="h-[20px] flex-1" />
        <Text className="text-body-sm text-medium-gray text-right font-bold">
          {currentPoints}/{MAX_EXP}
        </Text>
      </div>
    </article>
  );
};

export default UserLevelProgress;
