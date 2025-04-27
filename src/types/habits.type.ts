import { Categories, Habit } from '@prisma/client';

export type UserPoint = {
  id: string;
  userId: string;
  habitId: string | null;
  getTime: Date;
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

export type HabitFormData = Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>;

export type HabitWithPoints = Habit & {
  userPoints: UserPoint[];
};

export type HabitFormValues = {
  title: string;
  notes: string;
  categories: Categories;
  selectedDays: string[];
};

export type PageParam = {
  skip: number;
  take: number;
};

export type HabitsQueryResult = {
  habits: HabitWithPoints[];
  totalHabits: number;
  nextSkip: number;
};

export type FilterState = {
  selectedDay: string[];
  setSelectedDay: (day: string[]) => void;
  selectedCategory: Categories | null;
  setSelectedCategory: (category: Categories | null) => void;
};
