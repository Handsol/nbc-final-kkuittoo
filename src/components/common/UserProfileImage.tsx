'use client';

import { usePurchasedItemsQuery } from '@/lib/queries/usePurchasedItemsQuery';
import { getUserImageByLevel } from '@/lib/utils/user.utils';
import { ShopItem } from '@/types/shop.type';
import Image from 'next/image';

type UserProfileImageProps = {
  level: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const SIZE_VARIANTS = {
  sm: 64,
  md: 112,
  lg: 128,
  xl: 150,
};

const UserProfileImage = ({ level, size = 'md' }: UserProfileImageProps) => {
  const { data } = usePurchasedItemsQuery() as { data: ShopItem[] };
  const userImageSrc = getUserImageByLevel(level);
  const appliedItem = data?.find((item) => item.userItems?.[0]?.isApplied);
  const borderImageSrc = appliedItem?.itemImage || null;
  const profileSize = SIZE_VARIANTS[size];
  const borderSize = profileSize + 16;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: borderSize, height: borderSize }}
    >
      {/* 테두리 */}
      {borderImageSrc && (
        <Image
          src={borderImageSrc}
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
