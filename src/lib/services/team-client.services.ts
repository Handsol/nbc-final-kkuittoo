import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { TeamWithPoints } from '@/types/rank-users.type';
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

export const fetchGetSingleTeam = async (teamId: string) => {
  const res = await fetch(`/api/teams/${teamId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(TEAMS_MESSAGES.FETCH_FAILED);
  }

  return res.json();
};

/**
 * 팀 소개 수정 mutationFn
 *
 * @param data
 * @param teamId
 * @returns
 */

export type FormData = {
  teamBio: string;
};

export type updateTeamBioParam = {
  teamId: string;
  data: FormData;
};

export const updateTeamBio = async ({ teamId, data }: updateTeamBioParam) => {
  const res = await fetch(`/api/teams/${teamId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(TEAMS_MESSAGES.UPDATE_FAILED);
  }

  return res.json();
};

/**
 * 팀 공개여부 수정 mutationFn
 *
 * @param teamId
 * @param isOpened
 */
type updateTeamOpenStateParam = {
  teamId: string;
  isOpened: boolean;
};

export const updateTeamOpenState = async ({
  teamId,
  isOpened,
}: updateTeamOpenStateParam) => {
  const res = await fetch(`/api/teams/${teamId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isOpened }),
  });

  if (!res.ok) {
    throw new Error(TEAMS_MESSAGES.UPDATE_FAILED);
  }

  return res.json();
};

export const fetchGetTeamsWithPoints = async (): Promise<TeamWithPoints[]> => {
  const response = await fetch('/api/teams/', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) throw new Error('Failed to fetch teams');
  return response.json();
};
