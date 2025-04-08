'use client';

import Text from '@/components/common/Text';
import { Progress } from '@/components/ui/progress';

type UserProgressProps = {
  userPoints: number; // 누적 포인트
};

const MAX_EXP = 20;

const UserProgress = ({ userPoints }: UserProgressProps) => {
  const currentExp = userPoints % MAX_EXP;
  const progressPercent = (currentExp / MAX_EXP) * 100;

  return (
    <section className="w-full">
      <Progress value={progressPercent} className="w-full h-5" />
      <Text>
        {' '}
        {currentExp}/{MAX_EXP}
      </Text>
    </section>
  );
};

export default UserProgress;
