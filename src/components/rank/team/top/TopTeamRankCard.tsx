'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { TeamEmblem } from './TopTeamEmblem';
import TeamJoin from '@/components/team/TeamJoin';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';
import Text from '@/components/common/Text';

type Props = {
  team: TeamWithPoints;
  rank: number;
  hasTeam: boolean;
};

export const TopRankTeamCard = ({ team, rank, hasTeam }: Props) => {
  const currentMembers = team.memberCount;
  // 랭킹에 따라 포디움 크기와 상단면 크기 동적 설정
  const podiumSize =
    rank === 1
      ? { width: 'w-44', height: 'h-56' }
      : { width: 'w-32', height: 'h-44' };
  const topFaceOffset = rank === 1 ? '-mt-10' : '-mt-10';
  const topFaceHeight = rank === 1 ? 'h-8' : 'h-6';

  const currentQuest = getCurrentTeamQuest(team.totalPoints);

  return (
    <>
      <article className="flex flex-col items-center animate-fade-up">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col items-center mb-2">
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
            {team.teamName}
          </UserTitle>
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            Lv.{currentQuest.id}
          </UserTitle>
          <Text>
            {team.memberCount}/{team.maxTeamSize}
          </Text>
          <TeamEmblem teamName={team.teamName} emblem={team.emblem} />
        </div>

        <div className="relative flex flex-col items-center justify-center">
          {/* 포디움 영역 */}
          <div
            className={`relative ${podiumSize.width} ${podiumSize.height} rounded-t-md bg-gradient-to-b from-main to-white flex items-center justify-center`}
          >
            {/* 기울어진 상단면 컨테이너 */}
            <div
              className="absolute top-0 left-0 w-full"
              style={{ perspective: '600px' }} // 상단면에만 원근법 적용
            >
              <div
                className={`p-6 w-full ${topFaceHeight} ${topFaceOffset} bg-sub rounded-t-md`}
                style={{
                  transform: 'rotateX(70deg) translateZ(4px)', // 3D 효과를 위한 회전
                  transformOrigin: 'bottom',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
            <span className="text-heading-xl font-bold text-white z-10">
              {rank}
            </span>
          </div>

          {/* 참여하기 버튼 */}
          <TeamJoin
            team={team}
            hasTeam={hasTeam}
            currentMembers={currentMembers}
          />
        </div>
      </article>
    </>
  );
};
