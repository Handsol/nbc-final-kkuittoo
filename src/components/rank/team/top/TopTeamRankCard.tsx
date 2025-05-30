'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { TeamEmblem } from './TopTeamEmblem';
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
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';
import TeamOpenNotEditMode from '@/components/team/team-edit/TeamOpenNotEditMode';
import { Z_INDEX } from '@/constants/z-index.constants';

type Props = {
  team: TeamWithPoints;
  rank: number;
  animationDelay?: number;
};

export const TopRankTeamCard = ({ team, rank, animationDelay }: Props) => {
  // 랭킹에 따라 포디움 크기와 상단면 크기 동적 설정
  const podiumSize =
    rank === 1
      ? { width: 'w-28 md:w-52', height: 'h-32 md:h-64' }
      : { width: 'w-20 md:w-44', height: 'h-24 md:h-52' };
  const topFaceOffset = rank === 1 ? '-mt-10' : '-mt-10';
  const topFaceHeight = rank === 1 ? 'h-8' : 'h-6';

  const currentQuest = getCurrentTeamQuest(team.totalPoints);

  const teamId = team.id;

  return (
    <Link href={`${PATH.TEAM}/${teamId}`}>
      <article className={rankCardContainer}>
        {/* 유저 정보 영역 */}
        <div className={`${rankCardInfoWrapper} aniamte-fade-up`}>
          <div className="flex items-center gap-2">
            <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
              {team.teamName}
            </UserTitle>
            <TeamOpenNotEditMode teamId={team.id} />
          </div>
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
          <span
            className={`text-heading-xl font-bold text-white z-${Z_INDEX.RANK_LABEL}`}
          >
            {rank}
          </span>
        </div>
      </article>
    </Link>
  );
};
