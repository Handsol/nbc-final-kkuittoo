import { TeamData } from '@/types/teams.type';

// 팀 데이터 가져오기
export const fetchGetTeams = async (): Promise<TeamData[]> => {
  const res = await fetch('/api/teams', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('팀 데이터를 가져오는데 실패했습니다.');
  }
  return res.json();
};

export const updateTeamBio = async (data: FormData, teamId: string) => {
  const res = await fetch(`/api/teams/${teamId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('팀 소개 수정 실패');
  }

  return res.json();
};
