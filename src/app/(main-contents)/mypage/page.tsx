import Text from '@/components/common/Text';
import MyPageCalendar from '@/components/mypage/MyPageCalendar';
import MyPageHabits from '@/components/mypage/MyPageHabits';
import MyPageProfile from '@/components/mypage/MyPageProfile';
import MyPageTeam from '@/components/mypage/MyPageTeam';
import { authOptions } from '@/lib/utils/auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: '마이페이지 | KKUITTOO',
  description:
    '사용자의 습관, 프로필 및 팀 정보를 확인할 수 있는 마이페이지입니다.',
  keywords: ['마이페이지', '습관', '팀'],
  openGraph: {
    title: '마이페이지 | KKUITTOO',
    description:
      '사용자의 습관, 프로필 및 팀 정보를 확인할 수 있는 마이페이지입니다.',
    type: 'website',
    url: 'http://localhost:3000/mypage',
    images: [
      {
        url: '/images/test01.png',
        width: 1200,
        height: 630,
        alt: '마이페이지 미리보기',
      },
    ],
  },
};

const MyPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3rem)]">
        <Text>로그인이 필요합니다.</Text>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-[30px] py-6 min-h-[calc(100vh-3rem)] gap-10">
      <div className="w-full max-w-[680px] flex gap-6">
        <div className="w-[370px] h-[640px]">
          <MyPageHabits userId={session.user.id} />
        </div>

        <div className="w-[280px] h-[640px] flex flex-col gap-4">
          <MyPageProfile userId={session.user.id} />
          <div className="flex-[3]">
            {/* 없어질 예정 */}
            <MyPageCalendar />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[680px]">
        <MyPageTeam userId={session.user.id} />
      </div>
    </div>
  );
};

export default MyPage;
