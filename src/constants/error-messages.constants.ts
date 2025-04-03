export const ERROR_MESSAGES = {
  AUTH_REQUIRED: '인증이 필요합니다.',
  HABIT_NOT_FOUND: 'Habit을 찾을 수 없습니다.',
  NO_PERMISSION: '이 Habit에 접근할 권한이 없습니다.',
  INVALID_DAY: '오늘은 이 습관의 반복 요일이 아닙니다.',
  COOLDOWN_ACTIVE: '1시간 내에는 다시 포인트를 추가할 수 없습니다.',
  TITLE_LENGTH: '제목은 1~15자여야 합니다.',
  NOTES_LENGTH: '메모는 1~50자여야 합니다.',
  CATEGORY_REQUIRED: '카테고리는 1개 이상 선택해야 합니다.',
  CREATE_FAILED: 'Habit 생성에 실패했습니다.',
  UPDATE_FAILED: 'Habit 수정에 실패했습니다.',
  DELETE_FAILED: 'Habit 삭제에 실패했습니다.',
  FETCH_FAILED: 'Habit을 가져오는데 실패했습니다.',
  POINT_ADD_FAILED: '포인트 추가에 실패했습니다.',
} as const;

export const COMMON_ERROR_MESSAGES = {
  UNAUTHORIZED: '인증이 필요합니다.',
};

export const TEAMS_MESSAGES = {
  // request 조건 미달
  ADD_TEAM_REQUIRED: '팀이름, 팀소개, 엠블럼, 최대인원수는 필수입니다.',
  UPDATE_TEAM_REQUIRED: '수정시 팀소개/팀 공개여부 중 1개 이상 입력해야합니다.',
  TEAM_NAME_NOT_ALLOW: '팀이름이 적합하지 않습니다.',
  TEAM_BIO_NOT_ALLOW: '팀소개가 적합하지 않습니다.',
  OWNER_ONLY: '팀 생성자만 가능합니다.',
  PRIVATE_ACCESS: '본인만 가능합니다.',
  OTHERS_EXIST: '팀 생성자 외 다른 유저가 존재합니다.',
  // success 모음
  CREATE_SUCCESS: 'Team 데이터 생성에 성공했습니다.',
  UPDATE_SUCCESS: 'Team 데이터 수정에 성공했습니다.',
  DELETE_SUCCESS: 'Team 데이터 삭제에 성공했습니다.',
  LEAVE_SUCCESS: 'Team 탈퇴에 성공했습니다.',
  // fail 모음
  NOT_FOUND: 'Team 데이터가 없습니다.',
  MEMBER_NOT_FOUND: 'Team Member 데이터가 없습니다.',
  FETCH_FAILED: 'Team 데이터를 가져오는데 실패했습니다.',
  CREATE_FAILED: 'Team 데이터 생성에 실패했습니다.',
  UPDATE_FAILED: 'Team 데이터 수정에 실패했습니다.',
  DELETE_FAILED: 'Team 데이터 삭제에 실패했습니다.',
  LEAVE_FAILED: 'Team 탈퇴에 실패했습니다.',
};
