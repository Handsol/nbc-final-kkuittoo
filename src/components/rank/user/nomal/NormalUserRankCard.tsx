'use client';

import { UserData } from '@/types/rank.type';
import { NormalUserRankLabel } from './NormalUserRankLabel';
import { NormalUserAvatar } from './NormalUserAvatar';
import { NormalUserInfo } from './NormalUserInfo';
import { getUserLevel } from '@/lib/utils/user-level.utils';
import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import UserDetailModal from '../UserDetailModal';

type Props = {
  user: UserData;
  rank: number;
};

export const NormalUserRankCard = ({ user, rank }: Props) => {
  const userLevel = getUserLevel(user.totalPoints);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="border rounded-3xl p-4 shadow-md bg-sub-light
         w-full h-24 flex flex-row items-center
         "
      >
        {/* 랭크 영역: width 18px, height 40px, 오른쪽에 25px 여백 */}
        <div className="mr-[25px]">
          <NormalUserRankLabel rank={rank} />
        </div>
        {/* 이미지 영역 */}
        <NormalUserAvatar userName={user.name} level={userLevel} />
        {/* 이미지와 정보 영역 사이에 25px 간격 */}
        <div className="ml-[25px] flex-1">
          <NormalUserInfo user={user} />
        </div>
      </article>
      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserDetailModal user={user} onClose={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};
