import Image from 'next/image';
import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';

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
      <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv.</UserTitle>
      <div className="flex-1">
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{member.name}</UserTitle>
        <Text>{member.bio}</Text>
      </div>
    </li>
  );
};

export default TeamMemberCard;
