import { TeamData } from './teams.type';

// 유저 랭킹에 필요한 타입
export type UserData = {
  id: string;
  name: string;
  bio: string;
  email: string;
  image: string;
  userPoints: { points: number }[]; // 포인트 배열 (합산해서 랭킹 계산)
};

export type TeamWithPoints = TeamData & {
  totalPoints: number;
  memberCount: number;
};

export type TeamCardProps = {
  team: TeamWithPoints; // 팀 데이터
  rank: number; // 순위
  isTopRank: boolean; // 상단 3위 여부
};

export type UserCardProps = {
  user: UserData;
  rank: number;
  isTopRank: boolean;
};
