'use client';

import { getUserImageByLevel } from '@/lib/utils/user.utils';
import { CardUserItemData } from '@/types/rank.type';
import Image from 'next/image';
import clsx from 'clsx';
import {
  CONTAINER_SIZE_CLASSES,
  IMAGE_SIZE_CLASSES,
  type ProfileImageSize,
} from '@/constants/image.constants';
import { Z_INDEX } from '@/constants/z-index.constants';

type UserProfileImageProps = {
  level: number;
  size?: ProfileImageSize;
  items?: CardUserItemData[];
};

const UserProfileImage = ({
  level,
  size = 'sidebar',
  items,
}: UserProfileImageProps) => {
  const userImageSrc = getUserImageByLevel(level);

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
      className={clsx(
        'relative flex items-center justify-center',
        CONTAINER_SIZE_CLASSES[size],
      )}
    >
      {/* 테두리 */}
      {currentAppliedItem && (
        <Image
          src={currentAppliedItem}
          alt="border"
          fill
          className={`absolute rounded-full object-cover z-${Z_INDEX.RANK_LABEL} `}
        />
      )}
      {/* 프로필 캐릭터 */}
      <div
        className={clsx(
          'absolute rounded-full overflow-hidden',
          IMAGE_SIZE_CLASSES[size],
        )}
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
