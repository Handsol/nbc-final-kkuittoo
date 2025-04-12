import { getExpPercent, getUserLevel } from '@/lib/utils/user-level.utils';
import UserLevel from '../profile/UserLevel';
import { Progress } from '@/components/ui/progress';
import Text from '@/components/common/Text';
import { useUserQuery } from '@/lib/queries/useUserQuery';

type UserLevelProgressProps = {
  userId: string;
};

const UserLevelProgress = ({ userId }: UserLevelProgressProps) => {
  const { data: user, isPending } = useUserQuery(userId);

  if (isPending) return <Text>로딩중</Text>;
  if (!user) return <Text>존재하지 않는 유저입니다.</Text>;

  const totalPoints = user.userPoints.reduce((sum, p) => sum + p.points, 0);
  const level = getUserLevel(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  return (
    <div className="flex items-center gap-2">
      <UserLevel level={level} />
      <Progress value={expPercent} className="w-full h-5" />
    </div>
  );
};

export default UserLevelProgress;
