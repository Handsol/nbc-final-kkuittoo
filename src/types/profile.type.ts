export type User = {
  id: string;
  name: string;
  bio?: string;
  email: string;
  image: string;
};

export type UpdateProfile = {
  name: string;
  bio?: string;
};
