type TeamTitleProps = {
  teamName: string;
  currentQuestName: string;
};

const TeamTitle = ({ teamName, currentQuestName }: TeamTitleProps) => {
  return (
    <div>
      <p className="font-bold text-2xl">{teamName}</p>
      <p className="font-bold text-4xl">{currentQuestName}</p>
    </div>
  );
};

export default TeamTitle;
