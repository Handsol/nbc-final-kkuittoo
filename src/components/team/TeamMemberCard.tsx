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
    <li className="w-full bg-sub-light rounded-lg px-4 py-3">
      {/* 모바일 전용 구조  */}
      <div className="flex flex-col gap-2 md:hidden relative pb-8">
        <div className="text-body-sm font-semibold">
          <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>{rank}</UserTitle>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-3 items-start min-h-[140px]">
          {/* 이미지 */}
          <div className="flex justify-center pl-8">
            <UserProfileImage
              level={memberLevel}
              size="member"
              items={memberItemList}
            />
          </div>

          {/* 텍스트 */}
          <div className="flex flex-col gap-1 w-full overflow-hidden">
            {/* Lv 표시 */}
            <UserTitle
              mode={USER_TITLE_MODE.CARD_LEVEL}
              className="text-body-sm md:text-base"
            >
              Lv.{memberLevel}
            </UserTitle>

            {/* 이름 */}
            <UserTitle
              mode={USER_TITLE_MODE.CARD_NAME}
              className="truncate text-body-sm md:text-base w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {member.name}
            </UserTitle>

            {/* 소개글 */}
            <Text className="text-body-sm text-dark-gray w-full max-w-full overflow-hidden line-clamp-2 break-words">
              {member.bio}
            </Text>
          </div>

          {/* 기여도 */}
          <div className="absolute bottom-2 right-4 text-body-sm font-semibold text-right">
            <Text>기여도</Text>
            <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
              {totalContribution}점
            </UserTitle>
          </div>
        </div>
      </div>

      {/* 데스크탑 전용 구조  */}
      <div className="hidden md:flex w-full flex-row items-center justify-between gap-4">
        {/* 등수 + 이미지 + 레벨 */}
        <div className="flex items-center gap-6 min-w-[150px]">
          <div className="min-w-[32px] text-center">
            <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>{rank}</UserTitle>
          </div>
          <UserProfileImage
            level={memberLevel}
            size="member"
            items={memberItemList}
          />
          <div className="min-w-[60px] text-body-sm">
            <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
              Lv.{memberLevel}
            </UserTitle>
          </div>
        </div>

        {/* 닉네임 + 소개글 */}
        <div className="flex flex-row flex-1 gap-2 overflow-hidden">
          <div className="w-[110px] truncate">
            <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
              {member.name}
            </UserTitle>
          </div>
          <Text className="truncate text-body-sm text-gray-600">
            {member.bio}
          </Text>
        </div>

        {/* 기여도 */}
        <div className="text-right shrink-0 text-body-sm font-semibold">
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            {totalContribution}점
          </UserTitle>
        </div>
      </div>
    </li>
  );
};

export default TeamMemberCard;
