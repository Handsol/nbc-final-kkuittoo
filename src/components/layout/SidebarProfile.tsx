'use client';

import { useSession } from 'next-auth/react';
import { useUserQuery } from '@/lib/queries/useUserQuery';
import Image from 'next/image';
import UserProfileEdit from './profile/UserProfileEdit';
import Text from '../common/Text';
import { getUserImageByLevel } from '@/lib/utils/user.utils';

const SidebarProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { data: profileData, isPending } = useUserQuery(userId || '');

  if (isPending) return <Text>로딩 중...</Text>;

  const totalPoints =
    profileData?.userPoints?.reduce((sum, p) => sum + p.points, 0) || 0;
  const level = Math.floor(totalPoints / 20) + 1;
  const userImageSrc = getUserImageByLevel(level);

  return (
    <div className="mt-[10px] flex flex-col items-center gap-1 md:gap-3">
      <Image
        src={userImageSrc}
        alt="user"
        width={100}
        height={100}
        className="md:w-[150px] md:h-[150px] w-[100px] h-[100px]"
      />

      <UserProfileEdit
        name={profileData?.name || ''}
        bio={profileData?.bio || ''}
        userId={profileData?.id || ''}
      />
    </div>
  );
};

export default SidebarProfile;
