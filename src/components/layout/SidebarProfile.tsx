'use client';

import { useUserQuery } from '@/lib/queries/useUserQuery';
import UserProfileEdit from './profile/UserProfileEdit';
import Text from '../common/Text';
import UserProfileImage from '../common/UserProfileImage';
import { UserPoint } from '@prisma/client';
import UnauthorizedPage from '../loading-error-page/UnauthorizedPage';
import { getUserClientSession } from '@/lib/services/getUserClientSession.services';

const SidebarProfile = () => {
  const session = getUserClientSession();
  const userId = session?.data?.user.id ?? '';

  // tanstack query : useQuery
  const { data: profileData, isPending } = useUserQuery(userId);

  if (!session) return <UnauthorizedPage />;
  if (isPending) return <Text>로딩 중...</Text>;
  if (!profileData) throw new Error('유저 프로필 데이터 가져오기 실패');

  const totalPoints =
    profileData.userPoints.reduce(
      (sum: number, p: UserPoint) => sum + p.points,
      0,
    ) || 0;
  const level = Math.floor(totalPoints / 10) + 1;
  const userItems = profileData.userItems;

  return (
    <div className="my-[10px] flex flex-col items-center gap-[2px] ">
      <UserProfileImage level={level} size="lg" items={userItems} />

      <UserProfileEdit
        name={profileData.name}
        bio={profileData.bio}
        userId={profileData.id}
      />
    </div>
  );
};

export default SidebarProfile;
