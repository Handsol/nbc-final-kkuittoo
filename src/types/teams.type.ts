export type TeamData = {
  id: string;
  teamName: string;
  teamBio: string;
  createdAt: Date;
  emblem: string;
  maxTeamSize: number;
  isOpened: boolean;
  ownerId: string;
};

export type TeamMemberData = {
  id: string;
  userId: string;
  teamId: string;
  joinDate: Date;
};

export type MemberDetailData = {
  name: string | null;
  bio: string | null;
  email: string;
  userPoints: {
    points: number;
    getTime: Date;
  }[];
};

export type TeamInput = {
  teamName: string;
  teamBio: string;
  emblem: string;
  maxTeamSize: number;
  ownerId: string;
};

export type TeamQuest = {
  id: number;
  questName: string;
  questImage: string;
  requiredPoints: number;
};
