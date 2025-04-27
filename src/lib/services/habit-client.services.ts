import { API_PATH } from '@/constants/path.constants';
import { CreateHabit, HabitWithPoints, UpdateHabit } from '@/types/habits.type';
import { Categories, Habit } from '@prisma/client';

/**
 * 서버에서 습관 목록을 가져오는 함수
 *
 * @param skip 건너뛸 습관 수 (기본값: 0)
 * @param take 가져올 습관 수 (기본값: 5)
 * @param days 필터링할 요일들 (예: ['월', '수', '금'])
 * @param category 필터링할 카테고리 (예: '건강')
 * @returns 습관 목록과 전체 습관 수
 */
export const fetchGetAllHabits = async (
  skip: number = 0,
  take: number = 5,
  days?: string[],
  category?: Categories | null,
): Promise<{ habits: HabitWithPoints[]; totalHabits: number }> => {
  const params = new URLSearchParams();
  params.set('skip', skip.toString()); // 몇 개 건너뛸지
  params.set('take', take.toString()); // 몇 개 가져올지

  if (days && days.length > 0) {
    params.set('days', days.join(',')); // 요일 필터 (쉼표로 구분)
  }

  if (category) {
    params.set('category', category); // 카테고리 필터
  }

  const response = await fetch(`${API_PATH.HABITS}?${params}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('습관 목록을 불러오는데 실패했습니다.');
  }

  const data = await response.json();

  return {
    habits: data.habits.map((habit: HabitWithPoints) => ({
      ...habit,
      userPoints: habit.userPoints || [], // 포인트 데이터 (없으면 빈 배열)
    })),
    totalHabits: data.totalHabits, // 전체 습관 개수
  };
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
