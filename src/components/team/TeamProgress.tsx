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
    <section className="w-[200px]">
      <Progress value={progressPercent} className="w-full h-5" />
    </section>
  );
};

export default TeamProgress;
