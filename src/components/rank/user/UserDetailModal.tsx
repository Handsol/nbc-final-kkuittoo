'use client';

import React from 'react';
import Image from 'next/image';
import { UserData } from '@/types/rank.type';
import UserTitle from '@/components/common/UserTitle';
import { TITLE_MODE, USER_TITLE_MODE } from '@/constants/mode.constants';
import {
  getUserLevel,
  getExpPercent,
  getCurrentExp,
} from '@/lib/utils/user-level.utils';
import { getUserImageByLevel } from '@/lib/utils/user.utils';
import UserLevelProgress from '@/components/dashboard/habits/UserLevelProgress';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';

type Props = {
  user: UserData;
  onClose: () => void;
};

export const UserDetailModal = ({ user, onClose }: Props) => {
  // 사용자 총 포인트를 기반으로 레벨 및 경험치 계산
  const userLevel = getUserLevel(user.totalPoints);
  const expPercent = getExpPercent(user.totalPoints);
  const avatarUrl = getUserImageByLevel(userLevel);
  const currentExp = getCurrentExp(user.totalPoints);

  return (
    <div>
      {/* 헤더 영역 */}
      <div onClick={onClose} className="flex items-center justify-between mb-4">
        <Title mode={TITLE_MODE.SECTION_SUBTITLE}>USER DETAILS</Title>
      </div>

      {/* 사용자 정보 영역 */}
      <div className="flex flex-col items-center">
        {/* 사용자 아바타 */}
        <figure className="w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image
            src={avatarUrl}
            alt={user.name ?? 'User Avatar'}
            width={128}
            height={128}
            className="object-cover"
          />
        </figure>
        {/* 사용자 닉네임 */}
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{user.name}</UserTitle>
        {/* 경험치 바 영역 */}
        <div className="w-full mt-4">
          <UserLevelProgress
            level={userLevel}
            expPercent={expPercent}
            currentPoints={currentExp}
          />
        </div>
      </div>

      {/* 소개글 */}
      {user.bio && (
        <Text className="text-center text-dark-gray text-body-sm mt-4">
          {user.bio}
        </Text>
      )}
    </div>
  );
};

export default UserDetailModal;
