export const DAYS_OF_WEEK = [
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat',
  'sun',
] as const;
export const HABIT_VALIDATION = {
  TITLE: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 15,
  },
  NOTES: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 50,
  },
} as const;
