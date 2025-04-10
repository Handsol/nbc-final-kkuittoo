import { PROJECT_URL } from '@/constants/path.constants';
import { fetchTeamData } from '@/lib/services/team-actions.services';
import { TeamData } from '@/types/teams.type';
import { Metadata } from 'next';

export const TEAM_METADATA_MODE = {
  SINGLE_TEAM: 'singleTeam',
  NO_TEAM: 'noTeam',
};

export const generateTeamMetadata = async (
  mode: string,
  id?: string,
): Promise<Metadata> => {
  // team/[id]/page.tsx(팀 있는 경우)의 metadata
  if (mode === TEAM_METADATA_MODE.SINGLE_TEAM && !!id) {
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
        url: `${PROJECT_URL}/team/${teamId}`,
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
  }

  // team/page.tsx(팀 없는 경우)의 metadata
  if (mode === TEAM_METADATA_MODE.NO_TEAM && !id) {
    return {
      title: '팀페이지 | KKUITTOO',
      description:
        '함께하는 습관, 함께하는 성장! 팀에 가입해 함께 몬스터를 무찔러보세요!',
      keywords: ['KKUITTOO', '팀페이지', '습관', '협동', '몬스터'],
      openGraph: {
        title: '팀페이지 | KKUITTOO',
        description:
          '함께하는 습관, 함께하는 성장! 팀에 가입해 함께 몬스터를 무찔러보세요!',
        type: 'website',
        url: `${PROJECT_URL}/team`,
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
  }

  // fallback 리턴
  return {
    title: 'KKUITTOO',
    description: '함께하는 습관, 함께하는 성장! KKUITTOO에서 시작해보세요!',
    keywords: ['KKUITTOO', '습관', '협동', '팀'],
    openGraph: {
      title: 'KKUITTOO',
      description: '함께하는 습관, 함께하는 성장! KKUITTOO에서 시작해보세요!',
      url: `${PROJECT_URL}/team`,
      images: [
        {
          url: '/images/test01.png',
          width: 1200,
          height: 630,
          alt: 'KKUITTOO 미리보기',
        },
      ],
    },
  };
};
