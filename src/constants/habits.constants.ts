import { Categories } from '@prisma/client';

export const DAYS_OF_WEEK = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
] as const;
export const DAY_LABELS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const;
export const HABIT_CATEGORIES = [
  'HEALTH', //건강
  'EXERCISE', //운동
  'ROUTINE', //일상/습관
  'SD', //self-development 자기계발
  'ETC', //기타
] as const;
export const HABIT_CATEGORY_LABELS: Record<Categories, string> = {
  HEALTH: '건강',
  EXERCISE: '운동',
  ROUTINE: '일상/습관',
  SD: '자기계발',
  ETC: '기타',
};
export const POINTS_TO_ADD = 1;
export const MAX_POINTS_PER_DAY = 10;
export const ONE_HOUR_COOLDOWN_MS = 60 * 60 * 1000;
