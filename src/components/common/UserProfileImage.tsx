'use client';

import { usePurchasedItemsQuery } from '@/lib/queries/usePurchasedItemsQuery';
import { cn } from '@/lib/utils';
import { getUserImageByLevel } from '@/lib/utils/user.utils';
import { ShopItem } from '@/types/shop.type';

import Image from 'next/image';

type UserProfileImageProps = {
  level: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  item: string;
};

const SIZE_VARIANTS = {
  sm: 'w-[64px] h-[64px]',
  md: 'w-[112px] h-[112px]',
  lg: 'w-[128px] h-[128px]',
  xl: 'w-[150px] h-[150px]',
};

const UserProfileImage = ({ level, size = 'md' }: UserProfileImageProps) => {
  const { data } = usePurchasedItemsQuery() as { data: ShopItem[] };
  const userImageSrc = getUserImageByLevel(level);
  const appliedItem = data?.find((item) => item.userItems?.[0]?.isApplied);
  const borderImageSrc = appliedItem?.itemImage || null;

  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        SIZE_VARIANTS[size],
      )}
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
      <Image
        src={userImageSrc}
        alt="user profile"
        fill
        className="rounded-full object-cover p-5"
      />
    </div>
  );
};

export default UserProfileImage;
