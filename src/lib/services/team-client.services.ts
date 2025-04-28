import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { API_PATH } from '@/constants/path.constants';
import { TeamData } from '@/types/teams.type';
import { TeamFormInputs } from '../hooks/useTeamCreateForm';
import { TeamWithPoints } from '@/types/rank.type';

// 팀 데이터 가져오기
export const fetchGetTeams = async (): Promise<TeamData[]> => {
  try {
    const response = await fetch(API_PATH.TEAMS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(TEAMS_MESSAGES.FETCH_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error('fetchGetTeams 에러:', error);
    throw new Error(TEAMS_MESSAGES.FETCH_FAILED);
  }
};

export const fetchGetSingleTeam = async (teamId: string) => {
  try {
    const response = await fetch(`${API_PATH.TEAMS}/${teamId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(TEAMS_MESSAGES.FETCH_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error('fetchGetSingleTeam 에러:', error);
    throw new Error(TEAMS_MESSAGES.FETCH_FAILED);
  }
};

/**
 * 팀 소개 수정 mutationFn
 *
 * @param data
 * @param teamId
 * @returns
 */

export type TeamFormData = {
  teamBio: string;
  isOpened?: boolean;
};

export type updateTeamBioParam = {
  teamId: string;
  data: TeamFormData;
};

export const fetchUpdateTeamBio = async ({
  teamId,
  data,
}: updateTeamBioParam) => {
  try {
    const response = await fetch(`${API_PATH.TEAMS}/${teamId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(TEAMS_MESSAGES.UPDATE_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error('fetchUpdateTeamBio 에러:', error);
    throw new Error(TEAMS_MESSAGES.UPDATE_FAILED);
  }
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

export const fetchUpdateTeamOpenState = async ({
  teamId,
  isOpened,
}: updateTeamOpenStateParam) => {
  try {
    const response = await fetch(`${API_PATH.TEAMS}/${teamId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isOpened }),
    });

    if (!response.ok) {
      throw new Error(TEAMS_MESSAGES.UPDATE_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error('fetchUpdateTeamOpenState 에러:', error);
    throw new Error(TEAMS_MESSAGES.UPDATE_FAILED);
  }
};

/**
 * 새로운 팀 생성 로직
 *
 * @param data {TeamFormInputs}
 * @returns
 */
export const fetchCreateNewTeam = async (data: TeamFormInputs) => {
  try {
    const response = await fetch(API_PATH.TEAMS, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        maxTeamSize: parseInt(data.maxTeamSize, 10),
      }),
    });

    if (!response) {
      throw new Error(TEAMS_MESSAGES.CREATE_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error('fetchCreateNewTeam 에러:', error);
    throw new Error(TEAMS_MESSAGES.CREATE_FAILED);
  }
};

/**
 * 본인의 teamMember 데이터 (팀 가입 데이터) 삭제 로직
 * 팀원의 TeamLeaveButton에서 사용되는 로직
 *
 * @param id {string}
 * @returns
 */
export const fetchDeleteMyTeamMember = async (id: string) => {
  try {
    const response = await fetch(`${API_PATH.MEMBERS}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`${TEAMS_MESSAGES.DELETE_FAILED}, 팀 탈퇴`);
    }

    return response.json();
  } catch (error) {
    console.error('fetchDeleteMyTeamMember 에러:', error);
    throw new Error(TEAMS_MESSAGES.DELETE_FAILED);
  }
};

/**
 * 팀 생성자의 경우 team 데이터 삭제(해체) 로직
 * 팀장의 TeamDisbandButton에서 사용되는 로직
 *
 * @param teamId {string}
 * @returns
 */
export const fetchDeleteTeam = async (teamId: string) => {
  try {
    const response = await fetch(`${API_PATH.TEAMS}/${teamId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`${TEAMS_MESSAGES.DELETE_FAILED}, 팀 해체`);
    }

    return response.json();
  } catch (error) {
    console.error('fetchDeleteTeam 에러:', error);
    throw new Error(TEAMS_MESSAGES.DELETE_FAILED);
  }
};

/**
 * 팀 가입 로직
 *
 * @param teamId {string}
 * @returns
 */
export const fetchCreateTeamMember = async (
  teamId: string,
  password?: string,
) => {
  try {
    const response = await fetch(API_PATH.MEMBERS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        teamId,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(TEAMS_MESSAGES.JOIN_FAILED);
    }

    return response.json();
  } catch (error) {
    console.error('fetchDeleteTeam 에러:', error);
    throw new Error(TEAMS_MESSAGES.JOIN_FAILED);
  }
};

// 서버에서 팀 랭킹 데이터 가져오기 (더보기용)
export const fetchGetTeamRankList = async (
  offset = 0,
  limit = 5,
): Promise<TeamWithPoints[]> => {
  const res = await fetch(
    `${API_PATH.RANK_TEAMS}?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) {
    throw new Error(TEAMS_MESSAGES.FETCH_FAILED);
  }
  return res.json();
};
