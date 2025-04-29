import { UserData } from '@/types/rank.type';
import { TopUserAvatar } from './TopUserAvatar';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { getUserLevel } from '@/lib/utils/user-level.utils';
import { CommonModal } from '@/components/common/CommonModal';
import { useState } from 'react';
import UserDetailModal from '../UserDetailModal';
import { motion } from 'framer-motion';
import {
  floatAnimation,
  podiumBaseStyle,
  podiumTopFaceBaseStyle,
  rankCardContainer,
  rankCardInfoWrapper,
} from '@/styles/rankCardStyles';
import UserProfileImage from '@/components/common/UserProfileImage';

type Props = {
  user: UserData;
  rank: number;
  animationDelay?: number;
};

export const TopUserRankCard = ({ user, rank, animationDelay = 0 }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const podiumSize =
    rank === 1
      ? { width: 'w-28 md:w-52', height: 'h-32 md:h-64' }
      : { width: 'w-20 md:w-44', height: 'h-24 md:h-52' };

  const topFaceOffset = '-mt-10';
  const topFaceHeight = rank === 1 ? 'h-8' : 'h-6';

  const userLevel = getUserLevel(user.totalPoints);
  const userItem = user.userItems;

  return (
    <>
      <article
        className={`${rankCardContainer} animate-fade-up`}
        onClick={() => setIsModalOpen(true)}
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        {/* 유저 정보 영역 */}
        <div className={rankCardInfoWrapper}>
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{user.name}</UserTitle>
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
            Lv.{userLevel}
          </UserTitle>
          <motion.div {...floatAnimation}>
            <UserProfileImage level={userLevel} size="xl" items={userItem} />
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
      </article>
      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserDetailModal user={user} onClose={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};
