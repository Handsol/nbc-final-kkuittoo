'use client';

import Text from '../common/Text';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import UserTitle from '../common/UserTitle';
import UserProgress from './profile/UserProgress';
import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
  MAX_EXP,
} from '@/lib/utils/user-level.utils';
import UserLevel from './profile/UserLevel';
import UserProfileEdit from './profile/UserProfileEdit';
import { useUserQuery } from '@/lib/queries/useUserQuery';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageProfile = ({ userId }: MyPageHabitsProps) => {
  const { data: profileData, isLoading } = useUserQuery(userId);

  if (isLoading) return <Text>로딩 중...</Text>;
  if (!profileData) return <Text>존재하지 않는 유저입니다.</Text>;

  // 레벨 계산
  const totalPoints = profileData.userPoints.reduce(
    (sum, p) => sum + p.points,
    0,
  );
  const level = getUserLevel(totalPoints);
  const currentExp = getCurrentExp(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  return (
    <div className="flex-[2] p-4 rounded-xl border shadow-sm bg-white">
      <div className="flex items-center justify-evenly">
        <UserLevel level={level} />
        <div className="text-center">
          <UserTitle mode={USER_TITLE_MODE.CARD_ID}>
            @{profileData.id.slice(-8)}
          </UserTitle>
        </div>
      </div>
      <UserProgress
        currentExp={currentExp}
        maxExp={MAX_EXP}
        value={expPercent}
      />
      <UserProfileEdit
        name={profileData.name || ''}
        bio={profileData.bio || ''}
        userId={profileData.id}
      />
    </div>
  );
};

export default MyPageProfile;
