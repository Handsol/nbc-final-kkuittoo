'use client';

import { getUserImageByLevel } from '@/lib/utils/user.utils';
import { CardUserItemData } from '@/types/rank.type';
import Image from 'next/image';
import clsx from 'clsx';
import { Z_INDEX } from '@/constants/z-index.constants';

type ProfileImageSize = 'topRank' | 'normalRank' | 'member' | 'sidebar';

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

  let currentAppliedItem: string | null = null;
  if (items && items.length > 0) {
    const appliedItem = items.find((item) => item.isApplied);
    if (appliedItem) {
      currentAppliedItem = appliedItem.item.itemImage;
    }
  }

  const containerClass = clsx('relative flex items-center justify-center', {
    'w-[100px] h-[100px] md:w-[160px] md:h-[160px]': size === 'topRank',
    'w-[100px] h-[100px] md:w-[100px] md:h-[100px]': size === 'normalRank',
    'w-[120px] h-[120px] md:w-[110px] md:h-[110px]': size === 'member',
    'w-[120px] h-[120px] md:w-[150px] md:h-[150px]': size === 'sidebar',
  });

  const imageWrapperClass = clsx(
    'relative z-[30] rounded-full overflow-hidden',
    {
      'w-[90px] h-[90px] md:w-[150px] md:h-[150px]': size === 'topRank',
      'w-[90px] h-[90px] md:w-[90px] md:h-[90px]': size === 'normalRank',
      'w-[120px] h-[120px] md:w-[110px] md:h-[110px]': size === 'member',
      'w-[110px] h-[110px] md:w-[150px] md:h-[150px]': size === 'sidebar',
    },
  );

  return (
    <div className={containerClass}>
      {/* 테두리 */}
      {currentAppliedItem && (
        <Image
          src={currentAppliedItem}
          alt="border"
          fill
          className={`absolute z-${Z_INDEX.RANK_LABEL} rounded-full object-cover`}
        />
      )}
      {/* 프로필 캐릭터 */}
      <div className={imageWrapperClass}>
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
