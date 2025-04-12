import Text from '@/components/common/Text';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageSection from '@/components/mypage/MyPageSection';
import MyPageTeam from '@/components/mypage/MyPageTeam';
import { myPageMetadata } from '@/lib/seo/mypage.metadata';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { Metadata } from 'next';

export const metadata: Metadata = myPageMetadata;

const MyPage = async () => {
  const session = await getUserSession();

  if (!session) {
    return (
      <div className="flex flex-col items-center px-[30px] py-6 min-h-full">
        <Text>로그인이 필요합니다.</Text>
      </div>
    );
  }
  const userId = session.user.id;

  return (
    <div className="flex flex-col items-center px-[30px] py-6  min-h-full gap-10 ">
      <MyPageSection label="User teams">
        <MyPageTeam userId={userId} />
      </MyPageSection>
      <MyPageSection label="User habits">
        <MyPageHabits userId={userId} />
      </MyPageSection>
    </div>
  );
};

export default MyPage;
