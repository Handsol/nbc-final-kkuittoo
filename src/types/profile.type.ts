export type User = {
  id: string;
  name: string;
  bio: string;
  email: string;
  image: string;
};

export type UpdateProfile = Partial<
  Omit<User, 'id' | 'userId' | 'createdAt' | 'userPoints'>
>;
