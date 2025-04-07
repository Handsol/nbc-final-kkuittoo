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
      <Progress value={progressPercent} className="w-full h-5" />
      <p>
        {teamTotalPoints}/{currentQuestRequired}
      </p>
    </section>
  );
};

export default TeamProgress;
