'use client';

import { useSession } from 'next-auth/react';
import { useUserQuery } from '@/lib/queries/useUserQuery';
import UserProfileEdit from './profile/UserProfileEdit';
import Text from '../common/Text';
import UserProfileImage from '../common/UserProfileImage';

const SidebarProfile = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { data: profileData, isPending } = useUserQuery(userId || '');

  if (isPending) return <Text>로딩 중...</Text>;

  const totalPoints =
    profileData?.userPoints?.reduce((sum, p) => sum + p.points, 0) || 0;
  const level = Math.floor(totalPoints / 20) + 1;

  return (
    <div className="my-[10px] flex flex-col items-center gap-1 md:gap-3">
      <UserProfileImage level={level} size="lg" />

      <UserProfileEdit
        name={profileData?.name || ''}
        bio={profileData?.bio || ''}
        userId={profileData?.id || ''}
      />
    </div>
  );
};

export default SidebarProfile;
