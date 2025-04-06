import Image from 'next/image';

type TeamMemberCardProps = {
  joinDate: Date;
  member: {
    id: string;
    name: string | null;
    bio: string | null;
    email: string;
    image: string | null;
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
    <li className="flex gap-5 justify-around items-center bg-white rounded-3xl px-5 py-3">
      <div className="w-14 h-14 rounded-full bg-neutral-300 relative overflow-hidden">
        {member.image && <Image src={member.image} alt="user_image" fill />}
      </div>
      <p className="font-bold text-2xl">Lv.</p>
      <div className="flex-1">
        <p>{member.name}</p>
        <p className="text-neutral-500">{member.bio}</p>
      </div>
      <p className="w-14 h-14 rounded-full text-center text-bold text-2xl bg-neutral-500">
        {memberContribution}
      </p>
    </li>
  );
};

export default TeamMemberCard;
