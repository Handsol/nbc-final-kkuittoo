import { TeamMember } from '@prisma/client';

export type User = {
  id: string;
  name: string;
  bio?: string;
  email: string;
  image: string;
  teamMembers?: TeamMember[];
};

export type UpdateProfile = {
  name: string;
  bio?: string;
};
