import UnauthorizedPage from '@/components/common/UnauthorizedPage';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageSection from '@/components/mypage/MyPageSection';
import MyPageTeam from '@/components/mypage/MyPageTeam';
import { myPageMetadata } from '@/lib/seo/mypage.metadata';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { fetchGetUserHabits } from '@/lib/services/habit-actions.services';
import { fetchGetUserProfile } from '@/lib/services/user-actions.services';
import { Metadata } from 'next';

export const metadata: Metadata = myPageMetadata;

const MyPage = async () => {
  const session = await getUserSession();

  if (!session) {
    return <UnauthorizedPage />;
  }
  const userId = session.user.id;

  // 초기 습관 데이터 가져오기
  const habits = await fetchGetUserHabits(userId);

  // 초기 포인트 계산
  const userProfile = await fetchGetUserProfile(userId);
  const totalPoints = userProfile
    ? userProfile.userPoints.reduce((sum, p) => sum + p.points, 0)
    : 0;

  return (
    <div className="flex flex-col items-center px-[30px] py-6 min-h-full gap-10">
      <MyPageSection label="User teams">
        <MyPageTeam userId={userId} />
      </MyPageSection>
      <MyPageSection label="User habits">
        <MyPageHabits
          userId={userId}
          initialHabits={habits}
          initialPoints={totalPoints}
        />
      </MyPageSection>
    </div>
  );
};

export default MyPage;
