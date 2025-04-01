type TeamData = {
  id: string;
  teamName: string;
  teamBio: string;
  createdAt: Date;
  emblem: string;
  maxTeamSize: number;
  isOpened: boolean;
  ownerId: string;
};

type TeamMemberData = {
  id: string;
  userId: string;
  teamId: string;
  joinDate: Date;
};

type TeamInput = {
  teamName: string;
  teamBio: string;
  emblem: string;
  maxTeamSize: number;
  ownerId: string;
};
