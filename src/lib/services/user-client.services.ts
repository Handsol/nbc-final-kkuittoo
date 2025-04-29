import { USER_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { API_PATH } from '@/constants/path.constants';
import { UserData } from '@/types/rank.type';
// 서버에서 유저 데이터 가져오기
export const fetchGetUsers = async (): Promise<UserData[]> => {
  const res = await fetch('/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    throw new Error('유저 데이터를 가져오는데 실패했습니다.');
  }
  return res.json();
};

export type UserFormData = {
  name: string;
  bio: string;
};

export type updateUserProfile = {
  userId: string;
  data: UserFormData;
};

export const fetchUpdateUserProfile = async ({
  userId,
  data,
}: updateUserProfile) => {
  const res = await fetch(`${API_PATH.USERS}/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(USER_ERROR_MESSAGES.UPDATE_FAILED);
  }
  return res.json();
};

/**
 * 유저 프로필 정보를 가져오는 fetch 함수
 *
 * @param userId - 조회할 유저 ID
 * @returns
 */
export const fetchGetUserProfileWithClient = async (userId: string) => {
  try {
    const res = await fetch(`${API_PATH.USERS}/${userId}`, {
      cache: 'no-store',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(USER_ERROR_MESSAGES.FETCH_FAILED);
    }
    return res.json();
  } catch (error) {
    console.error('fetchGetUserProfile error:', error);
    throw new Error(USER_ERROR_MESSAGES.FETCH_FAILED);
  }
};
