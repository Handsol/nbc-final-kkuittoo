'use client';

import { useSession } from 'next-auth/react';
import { useUserQuery } from '@/lib/queries/useUserQuery';
import Image from 'next/image';
import UserProfileEdit from '../mypage/profile/UserProfileEdit';
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
    <div className="mt-[40px] flex flex-col items-center gap-3">
      <Image src={userImageSrc} alt="user" width={150} height={150} />

      <UserProfileEdit
        name={profileData?.name || ''}
        bio={profileData?.bio || ''}
        userId={profileData?.id || ''}
      />
    </div>
  );
};

export default SidebarProfile;
