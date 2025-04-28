'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { TeamEmblem } from './TopTeamEmblem';
import TeamJoin from '@/components/team/TeamJoin';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';
import Text from '@/components/common/Text';
import { motion } from 'framer-motion';
import {
  floatAnimation,
  podiumTopFaceBaseStyle,
  rankCardContainer,
  rankCardInfoWrapper,
} from '@/styles/rankCardStyles';

type Props = {
  team: TeamWithPoints;
  rank: number;
  hasTeam: boolean;
  animationDelay?: number;
};

export const TopRankTeamCard = ({
  team,
  rank,
  hasTeam,
  animationDelay,
}: Props) => {
  const currentMembers = team.memberCount;
  // 랭킹에 따라 포디움 크기와 상단면 크기 동적 설정
  const podiumSize =
    rank === 1
      ? { width: 'w-28 md:w-52', height: 'h-32 md:h-64' }
      : { width: 'w-20 md:w-44', height: 'h-24 md:h-52' };
  const topFaceOffset = rank === 1 ? '-mt-10' : '-mt-10';
  const topFaceHeight = rank === 1 ? 'h-8' : 'h-6';

  const currentQuest = getCurrentTeamQuest(team.totalPoints);

  return (
    <>
      <article className={rankCardContainer}>
        {/* 유저 정보 영역 */}
        <div className={`${rankCardInfoWrapper} aniamte-fade-up`}>
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
            {team.teamName}
          </UserTitle>
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            Lv.{currentQuest.id}
          </UserTitle>
          <Text>
            {team.memberCount}/{team.maxTeamSize}
          </Text>
          <motion.div {...floatAnimation}>
            <TeamEmblem teamName={team.teamName} emblem={team.emblem} />
          </motion.div>
        </div>

        {/* 포디움 영역 */}
        <div
          className={`relative rounded-t-md bg-gradient-to-b from-main to-white flex items-center justify-center animate-fade-up ${podiumSize.width} ${podiumSize.height}
          `}
          style={{ animationDelay: `${animationDelay}ms` }}
        >
          {/* 기울어진 상단면 컨테이너 */}
          <div
            className={podiumTopFaceBaseStyle}
            style={{ perspective: '600px' }}
          >
            <div
              className={`p-6 w-full ${topFaceHeight} ${topFaceOffset} bg-sub rounded-t-md `}
              style={{
                transform: 'rotateX(70deg) translateZ(4px)',
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
        <div className="mt-2 min-h-[40px] flex justify-center items-center">
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
