import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';
import UserProfileImage from '../common/UserProfileImage';

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
  memberItemList: {
    itemId: string;
    isApplied: boolean;
    item: {
      itemImage: string;
    };
  }[];
  totalContribution: number;
};

const TeamMemberCard = ({
  rank,
  member,
  memberLevel,
  memberItemList,
  totalContribution,
}: TeamMemberCardProps) => {
  return (
    <li className="w-full flex flex-col md:flex-row items-start md:items-center justify-between bg-sub-light rounded-lg px-4 py-3 gap-2 md:gap-4">
      {/* ----- 등수 + 이미지 + 레벨 ----- */}
      <div className="flex items-center gap-3 md:gap-6 min-w-[150px]">
        {/* 등수 */}
        <div className="min-w-[24px] md:min-w-[32px] text-center">
          <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>{rank}</UserTitle>
        </div>

        {/* 이미지 : 일단 본승님의 NormalUserAvatar를 사용했습니다.*/}
        <UserProfileImage
          level={memberLevel}
          size="sm"
          items={memberItemList}
        />

        {/* 레벨 */}
        <div className="min-w-[60px] text-sm">
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            Lv.{memberLevel}
          </UserTitle>
        </div>
      </div>

      {/* ----- 닉네임 + 소개글 ----- */}
      <div className="flex flex-col md:flex-row flex-1 gap-1 md:gap-2 overflow-hidden">
        {/* 닉네임 */}
        <div className="w-[110px] truncate">
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{member.name}</UserTitle>
        </div>
        {/* 소개글 */}
        <Text className="truncate text-sm text-gray-600">{member.bio}</Text>
      </div>

      {/* ----- 기여도 ----- */}
      <div className="text-right shrink-0 text-sm font-semibold">
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
          {totalContribution}점
        </UserTitle>
      </div>
    </li>
  );
};

export default TeamMemberCard;
