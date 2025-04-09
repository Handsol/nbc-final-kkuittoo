import { fetchTeamData } from '@/lib/services/team-actions.services';
import { TeamData } from '@/types/teams.type';
import { Metadata } from 'next';

export const generateTeamMetadata = async (id: string): Promise<Metadata> => {
  const teamData = await fetchTeamData(id);
  const { teamName, isOpened, id: teamId } = teamData as TeamData;
  const teamPassword = teamId.slice(-6);

  return {
    title: `${teamName} | KKUITTOO`,
    description: `함께하는 습관, 함께하는 성장! ${teamName} 팀과 몬스터를 무찔러보세요!`,
    keywords: ['KKUITTOO', '팀페이지', '습관', '협동', '몬스터'],
    openGraph: {
      title: `${teamName} | KKUITTOO`,
      description: isOpened
        ? `나 혼자 하면 작심삼일, ${teamName} 팀과 함께라면 습관도 성장도 쉬워져요!
        팀 비밀번호 : ${teamPassword}`
        : `나 혼자 하면 작심삼일, ${teamName} 팀과 함께라면 습관도 성장도 쉬워져요!`,
      url: `https://kkuittoo.com/team/${teamId}`,
      images: [
        {
          url: '/images/test01.png',
          width: 1200,
          height: 630,
          alt: `${teamName} 팀 미리보기`,
        },
      ],
    },
  };
};
