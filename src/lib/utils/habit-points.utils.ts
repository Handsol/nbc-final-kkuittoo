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
  userPoints: UserPoint[],
  now: Date,
): boolean => {
  // 포인트 기록이 없으면 쿨다운 없음
  if (userPoints.length === 0) return false;

  // 가장 최근 포인트를 시간순으로 정렬해 가져옴
  const lastPoint = userPoints.sort((a, b) => {
    return new Date(b.getTime).getTime() - new Date(a.getTime).getTime();
  })[0];

  const lastTime = new Date(lastPoint.getTime);
  const oneHourLater = new Date(lastTime.getTime() + ONE_HOUR_COOLDOWN_MS);

  return now < oneHourLater; // 쿨다운 여부
};

/**
 * 최근 포인트 획득 시간을 기준으로 쿨다운 상태인지 확인하는 유틸리티 함수
 * @param {UserPoint[]} userPoints - 유저의 포인트 이력 배열
 * @returns {boolean} - 아직 쿨다운 중이라면 true, 아니라면 false
 */
export const getCooldownStatus = (userPoints: UserPoint[]): boolean => {
  if (userPoints.length === 0) return false;

  const lastPoint = [...userPoints].sort(
    (a, b) => new Date(b.getTime).getTime() - new Date(a.getTime).getTime(),
  )[0];

  return (
    new Date() <
    new Date(new Date(lastPoint.getTime).getTime() + ONE_HOUR_COOLDOWN_MS)
  );
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
