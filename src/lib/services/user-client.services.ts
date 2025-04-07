import { UserData } from '@/types/rank-users.type';
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
