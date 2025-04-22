import { PROJECT_URL } from '@/constants/path.constants';
import { Metadata } from 'next';

export const dashboardMetadata: Metadata = {
  title: 'DASHBOARD | KKUITTOO',
  description:
    '사용자의 습관, 레벨 및 팀 정보를 확인할 수 있는 DASHBOARD입니다.',
  keywords: ['KKUITTOO', 'DASHBOARD', '습관', '팀', '레벨'],
  openGraph: {
    title: 'DASHBOARD | KKUITTOO',
    description:
      '사용자의 습관, 레벨 및 팀 정보를 확인할 수 있는 DASHBOARD입니다.',
    type: 'website',
    url: `${PROJECT_URL}/dashboard`,
    images: [
      {
        url: 'assets/images/test01.png',
        width: 1200,
        height: 630,
        alt: 'DASHBOARD 미리보기',
      },
    ],
  },
};
