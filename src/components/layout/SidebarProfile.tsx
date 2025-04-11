'use client';

import { useSession } from 'next-auth/react';
import { useUserQuery } from '@/lib/queries/useUserQuery';
import Image from 'next/image';
import UserProfileEdit from '../mypage/profile/UserProfileEdit';
import UserTitle from '../common/UserTitle';
import Text from '../common/Text';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { ID_SLICE } from '@/constants/magic-numbers.constants';

const SidebarAvatar = () => {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const { data: profileData, isPending } = useUserQuery(userId || '');

  if (isPending) return <Text>로딩 중...</Text>;

  return (
    <div className="mt-[100px] flex flex-col items-center gap-3">
      <Image
        src="/assets/images/user_lv1.png"
        alt="user"
        width={150}
        height={150}
      />

      <UserProfileEdit
        name={profileData?.name || ''}
        bio={profileData?.bio || ''}
        userId={profileData?.id || ''}
      />
    </div>
  );
};

export default SidebarAvatar;
