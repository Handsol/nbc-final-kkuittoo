'use client';

import Text from '@/components/common/Text';
import { Progress } from '@/components/ui/progress';

type UserProgressProps = {
  currentExp: number;
  maxExp: number;
  value: number;
};

const UserProgress = ({ currentExp, maxExp, value }: UserProgressProps) => {
  return (
    <section className="w-full">
      <Text>
        {currentExp}/{maxExp}
      </Text>

      <Progress value={value} className="w-full h-5" />
    </section>
  );
};

export default UserProgress;
