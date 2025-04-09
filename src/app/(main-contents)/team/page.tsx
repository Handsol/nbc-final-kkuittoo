import NoTeam from '@/components/mypage/NoTeam';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '팀페이지 | KKUITTOO',
  description:
    '함께하는 습관, 함께하는 성장! 팀에 가입해 함께 몬스터를 무찔러보세요!',
  keywords: ['KKUITTOO', '팀페이지', '습관', '협동', '몬스터'],
  openGraph: {
    title: '팀페이지 | KKUITTOO',
    description:
      '함께하는 습관, 함께하는 성장! 팀에 가입해 함께 몬스터를 무찔러보세요!',
    type: 'website',
    url: 'http://localhost:3000/team',
    images: [
      {
        url: '/images/test01.png',
        width: 1200,
        height: 630,
        alt: '팀페이지 미리보기',
      },
    ],
  },
};

const NoTeamPage = () => {
  return (
    <div className="w-full my-60 flex justify-center items-center">
      <NoTeam />
    </div>
  );
};

export default NoTeamPage;
