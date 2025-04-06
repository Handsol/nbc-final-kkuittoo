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
