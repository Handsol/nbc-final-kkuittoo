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
    <section className="w-full">
      <Progress value={progressPercent} className="w-[200px] h-5" />
    </section>
  );
};

export default TeamProgress;
