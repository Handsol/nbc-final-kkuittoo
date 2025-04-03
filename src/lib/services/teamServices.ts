import { TeamData } from '@/types/teams';

// 팀 데이터 가져오기
export const fetchTeams = async (): Promise<TeamData[]> => {
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
