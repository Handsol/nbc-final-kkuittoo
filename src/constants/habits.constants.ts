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
export const DAY_LABELS = ['월', '화', '수', '목', '금', '토', '일'] as const;
export const DAYS_OF_WEEK_ARRAY = [...DAYS_OF_WEEK] as string[];
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
export const REPEAT_OPTIONS = {
  EVERY_DAY: 'everyDay',
  WEEKDAYS: 'weekdays',
  WEEKENDS: 'weekends',
} as const;

export const REPEAT_OPTION_LABELS = {
  [REPEAT_OPTIONS.EVERY_DAY]: '매일',
  [REPEAT_OPTIONS.WEEKDAYS]: '주중',
  [REPEAT_OPTIONS.WEEKENDS]: '주말',
} as const;

export const REPEAT_OPTION_DAYS: Record<string, string[]> = {
  [REPEAT_OPTIONS.EVERY_DAY]: DAYS_OF_WEEK_ARRAY,
  [REPEAT_OPTIONS.WEEKDAYS]: ['mon', 'tue', 'wed', 'thu', 'fri'],
  [REPEAT_OPTIONS.WEEKENDS]: ['sat', 'sun'],
};

export const POINTS_TO_ADD = 1;
export const MAX_POINTS_PER_DAY = 10;
export const ONE_HOUR_COOLDOWN_MS = 60 * 60 * 1000;
