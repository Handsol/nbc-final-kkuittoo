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

// 서버에서 유저 랭킹 데이터 가져오기 (더보기용)
export const fetchGetUserRankList = async (
  offset = 0,
  limit = 5,
): Promise<UserData[]> => {
  const res = await fetch(
    `${API_PATH.RANK_USERS}?offset=${offset}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) {
    throw new Error(USER_ERROR_MESSAGES.FETCH_FAILED);
  }
  return res.json();
};
