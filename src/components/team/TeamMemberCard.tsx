import Image from 'next/image';
import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';

type TeamMemberCardProps = {
  rank: number;
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
  memberLevel: number;
  totalContribution: number;
};

const TeamMemberCard = ({
  rank,
  member,
  memberLevel,
  totalContribution,
}: TeamMemberCardProps) => {
  return (
    <li className="w-full flex items-center justify-between bg-sub-light rounded-lg px-9 py-2 gap-4">
      {/* ----- 등수 + 이미지 + 레벨 ----- */}
      <div className="flex items-center gap-6 min-w-[150px]">
        {/* 등수 */}
        <div className="min-w-[32px] text-center">
          <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>{rank}</UserTitle>
        </div>

        {/* 이미지 : 일단 임시로 프로필 이미지로 넣었습니다 */}
        <div className="w-9 h-9 rounded-full bg-neutral-300 relative overflow-hidden">
          {member.image && <Image src={member.image} alt="user_image" fill />}
        </div>
        {/* 레벨 */}
        <div className="min-w-[60px] text-sm">
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            Lv.{memberLevel}
          </UserTitle>
        </div>
      </div>

      {/* ----- 닉네임 + 소개글 ----- */}
      <div className="flex flex-1 items-center gap-2 overflow-hidden">
        {/* 닉네임 */}
        <div className="w-[110px] truncate">
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{member.name}</UserTitle>
        </div>
        {/* 소개글 */}
        <Text className="truncate min-w-0">{member.bio}</Text>
      </div>

      {/* ----- 기여도 ----- */}
      <div className="min-w-[70px] text-right shrink-0">
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
          {totalContribution}점
        </UserTitle>
      </div>
    </li>
  );
};

export default TeamMemberCard;
