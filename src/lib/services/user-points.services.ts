import { API_PATH } from '@/constants/path.constants';
import { UserPoint } from '@prisma/client';

/**
 * 사용자 포인트를 추가하는 함수
 * @param {string} habitId - 포인트를 추가할 습관의 ID
 * @returns - 추가된 포인트 정보
 */
export const fetchAddUserPoint = async (habitId: string) => {
  const res = await fetch(API_PATH.USERS_POINTS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ habitId }),
  });
  if (!res.ok) throw new Error('포인트 추가 실패');
  return res.json();
};
