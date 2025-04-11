import { API_PATH } from '@/constants/path.constants';
import { CreateHabit, UpdateHabit } from '@/types/habits.type';
import { Habit, UserPoint } from '@prisma/client';

/**
 * 사용자의 모든 Habit 목록을 조회하는 API 요청 함수
 * @returns {Promise<Array<Habit & { userPoints: UserPoint[] }>>} Habit 목록 (UserPoint 포함)
 */
export const fetchGetAllHabits = async (): Promise<
  Array<Habit & { userPoints: UserPoint[] }>
> => {
  const res = await fetch(API_PATH.HABITS, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('habit 목록 조회에 실패하였습니다.');
  return res.json();
};

/**
 * 새로운 Habit을 생성하는 API 요청 함수
 * @param {CreateHabit} data - 생성할 Habit의 정보
 * @returns {Promise<Habit>} 생성된 Habit
 */
export const fetchCreateHabit = async (data: CreateHabit): Promise<Habit> => {
  const res = await fetch(API_PATH.HABITS, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('habit 생성에 실패하였습니다.');
  return res.json();
};

/**
 * 선택한 Habit을 수정하는 API 요청 함수
 * @param {string} id - 수정할 Habit의 ID
 * @param {UpdateHabit} data - 수정할 데이터
 * @returns {Promise<Habit>} 수정된 Habit
 */
export const fetchUpdateHabit = async (
  id: string,
  data: UpdateHabit,
): Promise<Habit> => {
  const res = await fetch(`${API_PATH.HABITS}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('habit 수정에 실패하였습니다.');
  return res.json();
};

/**
 * 선택한 Habit을 삭제하는 API 요청 함수
 * @param {string} id - 삭제할 Habit의 ID
 * @returns {Promise<void>}
 */
export const fetchDeleteHabit = async (id: string): Promise<void> => {
  const res = await fetch(`${API_PATH.HABITS}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('habit 삭제에 실패하였습니다.');
};
