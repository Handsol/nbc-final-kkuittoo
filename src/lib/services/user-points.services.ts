export const addUserPoint = async (habitId: string) => {
  const response = await fetch('/api/user-points', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ habitId }),
  });
  if (!response.ok) throw new Error('포인트 추가 실패');
  return response.json();
};
