import { PROJECT_URL } from '@/constants/path';
import { TeamData } from '@/types/teams.type';

/**
 * team 데이터 가져오는 queryFn
 *
 * @param id {string} : teamId
 * @returns Promise<MyTeamData>
 */
export type MyTeamData = {
  teamMembers: {
    id: string;
    userId: string;
    teamId: string;
    joinDate: Date;
  }[];
} & {
  id: string;
  createdAt: Date;
  teamName: string;
  teamBio: string;
  emblem: string;
  maxTeamSize: number;
  isOpened: boolean;
  ownerId: string;
};

export const fetchGetMyTeamData = async (id: string) => {
  const res = await fetch(`${PROJECT_URL}/teams/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('해당 팀 데이터를 조회하는데 실패했습니다.');
  }

  const data: MyTeamData = await res.json();
  return data;
};

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
