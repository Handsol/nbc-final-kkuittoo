import { MAX_POINTS_PER_DAY } from './habits.constants';

export const TEAM_TOAST_MESSAGES = {
  SUCCESS: {
    TEAM_CREATE: {
      TITLE: '팀 생성 완료!',
      DESCRIPTION: '팀이 성공적으로 생성되었습니다.',
    },
    TEAM_JOIN: {
      TITLE: '팀 가입 완료!',
      DESCRIPTION: (teamName?: string) =>
        teamName
          ? `${teamName} 팀에 가입되었습니다!`
          : '팀에 성공적으로 가입되었습니다!',
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
    TEAM_JOIN: {
      TITLE: '팀 가입 실패',
      DESCRIPTION: (error?: string) => error || '오류가 발생했습니다.',
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
  SUCCESS: (name: string) => ({
    title: '로그인 되었습니다!',
    description: `${name}님, 오늘도 함께 성장해요!`,
  }),
};

export const HABIT_TOAST_MESSAGES = {
  SUCCESS: {
    HABIT_CREATE: {
      title: '성공',
      description:
        '습관이 생성되었습니다. [+P 버튼]을 눌러 포인트를 추가하세요.',
    },
    HABIT_UPDATE: {
      title: '성공',
      description: '습관이 수정되었습니다.',
    },
    HABIT_DELETE: {
      title: '성공',
      description: '습관이 삭제되었습니다.',
    },
    POINT_ADD: {
      title: '성공',
      description: '포인트가 추가되었습니다.',
    },
  },
  FAIL: {
    HABIT_CREATE: {
      title: '오류',
      description: '습관 생성 중 오류가 발생했습니다.',
    },
    HABIT_UPDATE: {
      title: '실패',
      description: '습관 수정에 실패했습니다.',
    },
    HABIT_DELETE: {
      title: '실패',
      description: '습관 삭제에 실패했습니다.',
    },
    POINT_LIMIT_EXCEEDED: {
      title: '알림',
      description: `하루 최대 ${MAX_POINTS_PER_DAY}포인트까지 획득 가능합니다.`,
    },
    POINT_ADD: {
      title: '실패',
      description: '포인트 추가에 실패했습니다.',
    },
  },
  INFO: {
    NO_CHANGES: {
      title: '알림',
      description: '변경된 내용이 없습니다.',
    },
  },
} as const;

export const SHARE_TOAST_MESSAGES = {
  SDK_LOADING: {
    TITLE: '오류가 발생했습니다',
    DESCRIPTION: '잠시 후에 다시 시도해주세요!',
  },
};
