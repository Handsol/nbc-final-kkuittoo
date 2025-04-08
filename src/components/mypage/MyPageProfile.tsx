import { fetchGetUserProfile } from '@/lib/services/user-actions.services';
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

type MyPageHabitsProps = {
  userId: string;
};

const MyPageProfile = async ({ userId }: MyPageHabitsProps) => {
  const profileData = await fetchGetUserProfile(userId);

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
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
            {profileData.name}
          </UserTitle>
          <UserTitle mode={USER_TITLE_MODE.CARD_ID}>
            @{profileData.id.slice(-8)}
          </UserTitle>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-full">
          수정
        </button>
      </div>
      <UserProgress
        currentExp={currentExp}
        maxExp={MAX_EXP}
        value={expPercent}
      />

      <Text>{profileData.bio}</Text>
    </div>
  );
};

export default MyPageProfile;
