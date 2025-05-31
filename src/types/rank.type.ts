export type UserData = {
  id: string;
  name: string | null;
  bio: string | null;
  email: string;
  totalPoints: number;
  userPoints: { points: number }[];
  userItems: CardUserItemData[];
  rank: number;
};

export type CardUserItemData = {
  isApplied: boolean;
  itemId: string;
  item: { itemImage: string };
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
  team: TeamWithPoints;
  rank: number;
  isTopRank: boolean;
  animationDelay?: number;
  hasTeam: boolean;
};

export type UserCardProps = {
  user: UserData;
  rank: number;
  isTopRank: boolean;
  animationDelay?: number;
};
