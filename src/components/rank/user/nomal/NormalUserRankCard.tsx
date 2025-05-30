'use client';

import { UserData } from '@/types/rank.type';
import { NormalUserRankLabel } from './NormalUserRankLabel';
import { NormalUserInfo } from './NormalUserInfo';
import { getUserLevel } from '@/lib/utils/user-level.utils';
import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import UserDetailModal from '../UserDetailModal';
import UserProfileImage from '@/components/common/UserProfileImage';

type Props = {
  user: UserData;
  rank: number;
};

export const NormalUserRankCard = ({ user, rank }: Props) => {
  const userLevel = getUserLevel(user.totalPoints);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userItem = user.userItems;

  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="border rounded-3xl p-4 shadow-md bg-sub-light w-full min-h-24 flex flex-row items-center cursor-pointer hover:scale-[1.03] duration-200"
      >
        {/* 랭크 영역: width 18px, height 40px, 오른쪽에 25px 여백 */}
        <div className="mr-[25px]">
          <NormalUserRankLabel rank={rank} />
        </div>
        {/* 이미지 영역 */}
        <div className="flex items-center justify-center min-w-[100px]">
          <UserProfileImage
            level={userLevel}
            size="NORMALRANK"
            items={userItem}
          />
        </div>
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
