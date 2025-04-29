'use client';

import { getUserImageByLevel } from '@/lib/utils/user.utils';
import { CardUserItemData } from '@/types/rank.type';
import Image from 'next/image';

type UserProfileImageProps = {
  level: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  items?: CardUserItemData[];
};

const SIZE_VARIANTS = {
  sm: 100,
  md: 112,
  lg: 128,
  xl: 150,
};

const UserProfileImage = ({
  level,
  size = 'md',
  items,
}: UserProfileImageProps) => {
  const userImageSrc = getUserImageByLevel(level);
  const profileSize = SIZE_VARIANTS[size];
  const borderSize = profileSize + 10;

  // 현재 적용 중인 아이템
  let currentAppliedItem: string | null = null;

  if (items && items.length > 0) {
    const appliedItem = items.find((item) => item.isApplied);

    if (appliedItem) {
      currentAppliedItem = appliedItem.item.itemImage;
    }
  }

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: borderSize, height: borderSize }}
    >
      {/* 테두리 */}
      {currentAppliedItem && (
        <Image
          src={currentAppliedItem}
          alt="border"
          fill
          className="absolute rounded-full object-cover"
        />
      )}
      {/* 프로필 캐릭터 */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{ width: profileSize, height: profileSize }}
      >
        <Image
          src={userImageSrc}
          alt="user profile"
          fill
          className="object-cover p-5"
        />
      </div>
    </div>
  );
};

export default UserProfileImage;
