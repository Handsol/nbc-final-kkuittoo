'use client';

import { cn } from '@/lib/utils';
import { getUserImageByLevel } from '@/lib/utils/user.utils';
import Image from 'next/image';

type UserProfileImageProps = {
  level: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

const SIZE_VARIANTS = {
  sm: 'w-[64px] h-[64px]',
  md: 'w-[112px] h-[112px]',
  lg: 'w-[128px] h-[128px]',
  xl: 'w-[150px] h-[150px]',
};

const UserProfileImage = ({ level, size = 'md' }: UserProfileImageProps) => {
  const userImageSrc = getUserImageByLevel(level);

  return (
    <div className="relative">
      {/* 프로필 이미지 (앞에) */}
      <Image
        src={userImageSrc}
        alt="user profile"
        width={150}
        height={150}
        className={cn('rounded-full object-cover z-10', SIZE_VARIANTS[size])}
      />
    </div>
  );
};

export default UserProfileImage;
