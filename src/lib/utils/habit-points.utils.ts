import {
  MAX_POINTS_PER_DAY,
  ONE_HOUR_COOLDOWN_MS,
} from '@/constants/habits.constants';
import { UserPoint } from '@prisma/client';
import { getToday } from './habit-date.utils';

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
  if (!userPoints || userPoints.length === 0) return false;

  const lastPoint = [...userPoints].sort(
    (a, b) => new Date(b.getTime).getTime() - new Date(a.getTime).getTime(),
  )[0];

  const lastTime = new Date(lastPoint.getTime);
  const oneHourLater = new Date(lastTime.getTime() + ONE_HOUR_COOLDOWN_MS);

  return now < oneHourLater;
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
