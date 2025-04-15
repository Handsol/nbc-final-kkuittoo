import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { API_PATH } from '@/constants/path.constants';
import { UserPoint } from '@prisma/client';

/**
 * 사용자 포인트를 추가하는 함수
 * @param {string} habitId - 포인트를 추가할 습관의 ID
 * @returns - 추가된 포인트 정보
 */
export const fetchAddUserPoint = async (
  habitId: string,
): Promise<UserPoint> => {
  const res = await fetch(API_PATH.USERS_POINTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ habitId }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.error ||
      (res.status === 400
        ? HABIT_ERROR_MESSAGES.DAILY_POINT_LIMIT_EXCEEDED
        : '포인트 추가 실패');

    throw new Error(errorMessage);
  }

  return res.json();
};

export const fetchGetUserPoints = async (): Promise<UserPoint[]> => {
  const res = await fetch(API_PATH.USERS_POINTS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || '포인트 조회 실패');
  }
  return res.json();
};
