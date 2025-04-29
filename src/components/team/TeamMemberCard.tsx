import Image from 'next/image';
import UserTitle from '../common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';
import { TeamMemberAvatar } from './TeamMemberAvatar';

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
    <li className="w-full bg-sub-light rounded-lg px-4 py-3">
      {/* 모바일 전용 구조  */}
      <div className="flex flex-col gap-2 md:hidden relative pb-8">
        <div className="text-body-sm font-semibold">
          <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>{rank}</UserTitle>
        </div>
        <div className="grid grid-cols-[auto_1fr] gap-3 items-start">
          <div className="items-center pl-8">
            <TeamMemberAvatar userName={member.name} level={memberLevel} />
          </div>
          <div className="flex flex-col justify-between w-full items-center">
            <div>
              <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
                Lv.{memberLevel}
              </UserTitle>
              <div className="truncate">
                <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
                  {member.name}
                </UserTitle>
              </div>
              <Text className="break-words text-body-sm text-dark-gray w-full">
                {member.bio}
              </Text>
            </div>
            <div className="absolute bottom-2 right-4 text-body-sm font-semibold">
              <Text>기여도</Text>
              <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
                {totalContribution}점
              </UserTitle>
            </div>
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
          <TeamMemberAvatar userName={member.name} level={memberLevel} />
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
