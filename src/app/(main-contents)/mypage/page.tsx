import Text from '@/components/common/Text';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageTeam from '@/components/mypage/MyPageTeam';
import { getUserSession } from '@/lib/services/getUserSession.services';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지 | KKUITTOO',
  description:
    '사용자의 습관, 프로필 및 팀 정보를 확인할 수 있는 마이페이지입니다.',
  keywords: ['KKUITTOO', '마이페이지', '습관', '팀'],
  openGraph: {
    title: '마이페이지 | KKUITTOO',
    description:
      '사용자의 습관, 프로필 및 팀 정보를 확인할 수 있는 마이페이지입니다.',
    type: 'website',
    url: 'http://localhost:3000/mypage', //임시
    images: [
      {
        url: '/images/test01.png', //임시
        width: 1200,
        height: 630,
        alt: '마이페이지 미리보기',
      },
    ],
  },
};

const MyPage = async () => {
  const session = await getUserSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <Text>로그인이 필요합니다.</Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-[30px] py-6 min-h-[calc(100vh-3rem)] gap-10 ">
      <div className="w-full max-w-[680px]">
        <MyPageTeam userId={session.user.id} />
      </div>

      <div className="w-full max-w-[680px]">
        <MyPageHabits userId={session.user.id} />
      </div>
    </div>
  );
};

export default MyPage;
