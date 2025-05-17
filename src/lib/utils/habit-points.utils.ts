import {
  MAX_POINTS_PER_DAY,
  ONE_HOUR_COOLDOWN_MS,
} from '@/constants/habits.constants';
import { UserPoint } from '@prisma/client';
import { getToday } from './habit-date.utils';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { InfiniteData } from '@tanstack/react-query';
import { HabitsQueryResult, PageParam } from '@/types/habits.type';

/**
 * 쿨다운 상태와 남은 시간을 반환
 * @param userPoints - 사용자의 포인트 기록
 * @param now - 현재 시간
 * @returns { isActive: boolean, remainingSeconds: number } - 쿨다운 상태와 남은 시간(초)
 */
export const getCooldownStatus = (
  userPoints: UserPoint[] | null | undefined,
  now: Date,
): { isActive: boolean; remainingSeconds: number } => {
  if (!userPoints || userPoints.length === 0) {
    return { isActive: false, remainingSeconds: 0 };
  }

  const lastPoint = [...userPoints].sort(
    (a, b) => new Date(b.getTime).getTime() - new Date(a.getTime).getTime(),
  )[0];

  const lastTime = new Date(lastPoint.getTime);
  const oneHourLater = new Date(lastTime.getTime() + ONE_HOUR_COOLDOWN_MS);
  const isActive = now < oneHourLater;

  const remainingSeconds = isActive
    ? Math.max(0, Math.floor((oneHourLater.getTime() - now.getTime()) / 1000))
    : 0;

  return { isActive, remainingSeconds };
};

/**
 * 사용자의 가장 최근 포인트 기록을 기반으로 쿨다운 상태인지 여부를 판단하는 함수
 * @param {UserPoint[]} userPoints - 사용자의 포인트 기록
 * @param {Date} now - 현재 시간 (비교 기준 시간)
 * @returns {boolean} - 쿨다운 상태면 true, 아니면 false
 */
export const isCooldownActive = (
  userPoints: UserPoint[] | null | undefined,
  now: Date,
): boolean => {
  return getCooldownStatus(userPoints, now).isActive;
};

/**
 * 초를 MM:SS 형식으로 포맷
 */
export const formatCooldownTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * 오늘 획득한 총 포인트 계산
 */
export const calculateTodayPoints = (points: UserPoint[]): number => {
  const today = getToday();
  return points.reduce((sum, point) => {
    const pointDate = new Date(point.getTime);
    return pointDate >= today ? sum + point.points : sum;
  }, 0);
};

/**
 * 하루 최대 포인트 제한 검증
 */
export const isDailyPointsLimitExceeded = (todayPoints: number): boolean => {
  return todayPoints >= MAX_POINTS_PER_DAY;
};

export const getHabitQueryKeys = (userId: string) => ({
  base: QUERY_KEYS.BASE_HABITS(userId),
  userPoints: QUERY_KEYS.USER_POINTS(userId),
});

export const optimisticUpdate = (
  oldData: InfiniteData<HabitsQueryResult, PageParam> | undefined,
  habitId: string,
  tempPoint: UserPoint,
) => {
  if (!oldData) return oldData;
  return {
    ...oldData,
    pages: oldData.pages.map((page) => ({
      ...page,
      habits: page.habits.map((habit) =>
        habit.id === habitId
          ? { ...habit, userPoints: [...habit.userPoints, tempPoint] }
          : habit,
      ),
    })),
  };
};
