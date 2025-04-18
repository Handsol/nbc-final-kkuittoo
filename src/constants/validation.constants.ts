// 팀 정보 유효성 검사
export const TEAM_VALIDATION = {
  TEAM_NAME: {
    MIN: 2,
    MAX: 10,
  },
  TEAM_BIO: {
    MIN: 5,
    MAX: 20,
  },
};

// 유저 정보 유효성 검사
export const USER_VALIDATION = {
  NAME: {
    MIN: 2,
    MAX: 15,
  },
  BIO: {
    MIN: 0,
    MAX: 50,
  },
};

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
