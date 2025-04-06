import { CreateHabit, UpdateHabit } from '@/types/mypage.type';
import { Habit } from '@prisma/client';

export const fetchCreateHabit = async (data: CreateHabit): Promise<Habit> => {
  const res = await fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('habit 생성에 실패하였습니다.');
  return res.json();
};

export const fetchUpdateHabit = async (
  id: string,
  data: UpdateHabit,
): Promise<Habit> => {
  const res = await fetch(`/api/habits/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('habit 수정에 실패하였습니다.');
  return res.json();
};

export const fetchDeleteHabit = async (id: string): Promise<void> => {
  const res = await fetch(`/api/habits/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('habit 삭제에 실패하였습니다.');
};
