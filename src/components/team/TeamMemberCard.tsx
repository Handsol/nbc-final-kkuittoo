type TeamMemberCardProps = {
  id: string;
  joinDate: Date;
  member: {
    id: string;
    name: string | null;
    bio: string | null;
    email: string;
    userPoints: {
      getTime: Date | null;
      points: number;
    }[];
  };
};

const TeamMemberCard = ({ joinDate, member }: TeamMemberCardProps) => {
  const memberContribution = member.userPoints
    .filter(
      (point) =>
        point.getTime instanceof Date &&
        point.getTime.getTime() >= joinDate.getTime(),
    )
    .reduce((total, current) => total + current.points, 0);

  return (
    <div className="flex gap-5 justify-around items-center border border-neutral-900 rounded-lg">
      <div>
        <p>{member.name}</p>
        <p className="text-neutral-400">{member.email}</p>
        <p>{member.bio}</p>
      </div>
      <p className="text-bold text-3xl">{memberContribution}</p>
    </div>
  );
};

export default TeamMemberCard;
