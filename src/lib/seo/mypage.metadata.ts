import { Metadata } from 'next';

export const myPageMetadata: Metadata = {
  title: '마이페이지 | KKUITTOO',
  description:
    '사용자의 습관, 프로필 및 팀 정보를 확인할 수 있는 마이페이지입니다.',
  keywords: ['KKUITTOO', '마이페이지', '습관', '팀'],
  openGraph: {
    title: '마이페이지 | KKUITTOO',
    description:
      '사용자의 습관, 프로필 및 팀 정보를 확인할 수 있는 마이페이지입니다.',
    type: 'website',
    url: 'http://localhost:3000/mypage', // 임시
    images: [
      {
        url: '/images/test01.png', // 임시
        width: 1200,
        height: 630,
        alt: '마이페이지 미리보기',
      },
    ],
  },
};
