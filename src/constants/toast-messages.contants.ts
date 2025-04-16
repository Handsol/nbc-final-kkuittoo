export const TEAM_TOAST_MESSAGES = {
  SUCCESS: {
    TEAM_CREATE: {
      TITLE: '팀 생성 완료!',
      DESCRIPTION: '팀이 성공적으로 생성되었습니다.',
    },
    TEAM_JOIN: {
      TITLE: '팀 가입 완료!',
      DESCRIPTION: '이제 함께 모험을 떠나볼까요?',
    },
    TEAM_DISBAND: {
      TITLE: '팀 해체 완료!',
      DESCRIPTION: '이제 새로운 팀을 찾아볼까요?',
    },
    TEAM_LEAVE: {
      TITLE: '팀 탈퇴 완료!',
      DESCRIPTION: '이제 새로운 팀을 찾아볼까요?',
    },
  },
  FAIL: {
    TEAM_CREATE: {
      TITLE: '팀 생성 실패!',
      DESCRIPTION: '팀 생성 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.',
    },
    TEAM_DISBAND: {
      TITLE: '남은 팀원이 있어요!',
      DESCRIPTION: '팀장을 제외한 다른 멤버가 없을 때, 해체가 가능해요!',
    },
    TEAM_PASSWORD: {
      TITLE: '비밀번호가 다릅니다!',
      DESCRIPTION: '비밀번호를 다시 확인해주세요.',
    },
  },
  ERROR: {
    SERVER: {
      TITLE: '서버 에러 발생!',
      DESCRIPTION: '서버 통신 중 문제가 생겼어요. 잠시 후 다시 시도해주세요.',
    },
  },
  CONFIRM: {
    TEAM_DISBAND: {
      TITLE: '정말로 해체하시겠습니까?',
      DESCRIPTION: '해체 시 기여도는 모두 사라집니다. 계속하시겠습니까?',
    },
    TEAM_LEAVE: {
      TITLE: '정말로 탈퇴하시겠습니까?',
      DESCRIPTION: '해체 시 기여도는 모두 사라집니다. 계속하시겠습니까?',
    },
  },
};

export const LOGIN_TOAST_MESSAGES = {
  SUCCESS: {
    TITLE: '로그인 되었습니다!',
    DESCRIPTION: '오늘도 함께 성장해요!',
  },
};
