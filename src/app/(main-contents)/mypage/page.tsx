import Text from '@/components/common/Text';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageTeam from '@/components/mypage/MyPageTeam';
import { myPageMetadata } from '@/lib/seo/mypage.metadata';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { Metadata } from 'next';

export const metadata: Metadata = myPageMetadata;

const MyPage = async () => {
  const session = await getUserSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <Text>로그인이 필요합니다.</Text>
      </div>
    );
  }
  const userId = session.user.id;

  return (
    <div className="flex flex-col items-center px-[30px] py-6 min-h-[calc(100vh-3rem)] gap-10 ">
      <div className="w-full max-w-[680px]">
        <MyPageTeam userId={userId} />
      </div>

      <div className="w-full max-w-[680px]">
        <MyPageHabits userId={userId} />
      </div>
    </div>
  );
};

export default MyPage;
