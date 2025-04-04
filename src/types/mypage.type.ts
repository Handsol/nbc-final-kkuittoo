export type Habit = {
  id: string;
  userId: string;
  title: string;
  notes: string;
  categories: string;
  createdAt: string;
  mon: boolean;
  tue: boolean;
  wed: boolean;
  thu: boolean;
  fri: boolean;
  sat: boolean;
  sun: boolean;
  userPoints: UserPoint[];
};

export type UserPoint = {
  id: string;
  userId: string;
  habitId: string | null;
  getTime: string | null;
  points: number;
};

export type CreateHabit = Required<
  Pick<Habit, 'title' | 'notes' | 'categories'>
> &
  Partial<Omit<Habit, 'id' | 'userId' | 'createdAt' | 'userPoints'>>;

export type UpdateHabit = Partial<
  Omit<Habit, 'id' | 'userId' | 'createdAt' | 'userPoints'>
>;

export type CreateUserPoint = {
  habitId: string;
};
