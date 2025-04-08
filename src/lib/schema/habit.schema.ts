import { z } from 'zod';
import { HABIT_VALIDATION } from '@/constants/validation.constants';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { DAYS_OF_WEEK } from '@/constants/habits.constants';

// 요일 데이터를 위한 동적 스키마
const daysSchema = () =>
  z.object(
    Object.fromEntries(
      DAYS_OF_WEEK.map((day) => [day, z.boolean().optional().default(false)]),
    ) as Record<Day, z.ZodTypeAny>,
  );

// 기본 Habit 필드 스키마
export const habitBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(HABIT_VALIDATION.TITLE.MIN_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH)
    .max(HABIT_VALIDATION.TITLE.MAX_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH),
  notes: z
    .string()
    .min(HABIT_VALIDATION.NOTES.MIN_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH)
    .max(HABIT_VALIDATION.NOTES.MAX_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH),
  categories: z.string().min(1, HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED),
});

// 생성용 스키마 (모든 필드 필수)
export const createHabitSchema = habitBaseSchema.merge(daysSchema());

// 업데이트용 스키마 (모든 필드 선택적)
export const updateHabitSchema = habitBaseSchema
  .partial()
  .merge(daysSchema().partial());

// 포인트 추가 스키마
export const createUserPointSchema = z.object({
  habitId: z.string().uuid(),
});

// 스키마와 인터페이스 연결
export type CreateHabitSchema = z.infer<typeof createHabitSchema>;
export type UpdateHabitSchema = z.infer<typeof updateHabitSchema>;
export type CreateUserPointSchema = z.infer<typeof createUserPointSchema>;
