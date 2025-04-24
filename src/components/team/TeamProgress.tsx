import Text from '../common/Text';
import { Progress } from '../ui/progress';

type TeamProgressProps = {
  teamTotalPoints: number;
  currentQuestRequired: number;
};

const TeamProgress = ({
  teamTotalPoints,
  currentQuestRequired,
}: TeamProgressProps) => {
  const progressPercent = (teamTotalPoints / currentQuestRequired) * 100;

  return (
    <section className="w-[200px] flex items-center gap-[4px]">
      <Progress value={progressPercent} className="h-5" />
      <Text className="text-body-sm text-medium-gray text-right font-bold">
        {teamTotalPoints}/{currentQuestRequired}
      </Text>
    </section>
  );
};

export default TeamProgress;
