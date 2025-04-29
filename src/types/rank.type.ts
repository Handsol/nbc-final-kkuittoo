// 유저 랭킹에 필요한 타입
export type UserData = {
  id: string;
  name: string | null;
  bio: string | null;
  email: string;
  totalPoints: number;
  userPoints: { points: number }[]; // 포인트 배열 (합산해서 랭킹 계산)
  rank: number;
};

export type TeamWithPoints = {
  id: string;
  teamName: string;
  teamBio: string;
  totalPoints: number;
  memberCount: number;
  maxTeamSize: number;
  isOpened: boolean;
  emblem: string;
  rank?: number;
};

export type TeamCardProps = {
  team: TeamWithPoints; // 팀 데이터
  rank: number; // 순위
  isTopRank: boolean; // 상단 3위 여부
  animationDelay?: number; // 애니메이션 지연 시간
  hasTeam: boolean;
};

export type UserCardProps = {
  user: UserData;
  rank: number;
  isTopRank: boolean;
  animationDelay?: number;
};
