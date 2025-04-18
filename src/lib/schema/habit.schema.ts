import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { DAYS_OF_WEEK, HABIT_CATEGORIES } from '@/constants/habits.constants';
import { HABIT_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

// habit의 기본 스키마
const baseHabitSchema = z.object({
  title: z
    .string()
    .min(HABIT_VALIDATION.TITLE.MIN_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH)
    .max(HABIT_VALIDATION.TITLE.MAX_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH)
    .transform((val) => val.trim()),
  notes: z
    .string()
    .min(HABIT_VALIDATION.NOTES.MIN_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH)
    .max(HABIT_VALIDATION.NOTES.MAX_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH),
  categories: z.enum(HABIT_CATEGORIES, {
    required_error: HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED,
  }),
});

//habit의 요일별 수행 여부 스키마. 각 요일은 선택적 boolean 값
const daysSchema = z.object({
  mon: z.boolean().optional(),
  tue: z.boolean().optional(),
  wed: z.boolean().optional(),
  thu: z.boolean().optional(),
  fri: z.boolean().optional(),
  sat: z.boolean().optional(),
  sun: z.boolean().optional(),
});

// 새로운 습관 생성 시 사용되는 스키마
export const createHabitSchema = baseHabitSchema.merge(daysSchema).refine(
  (data) => {
    return DAYS_OF_WEEK.some((day) => data[day] === true);
  },
  { message: HABIT_ERROR_MESSAGES.DAY_REQUIRED, path: ['days'] },
);

// 기존 습관 수정 시 사용되는 스키마
export const updateHabitSchema = baseHabitSchema
  .partial()
  .merge(daysSchema)
  .refine(
    (data) => {
      // 요일 필드가 하나라도 들어왔을 때만 검사하도록
      const hasDayField = DAYS_OF_WEEK.some((day) => day in data);
      if (!hasDayField) return true; // 요일 수정 안 하면 패스
      return DAYS_OF_WEEK.some((day) => data[day] === true); // 수정했다면 최소 하나는 true
    },
    { message: HABIT_ERROR_MESSAGES.DAY_REQUIRED },
  );

// 폼 입력용 습관 스키마
export const habitFormSchema = baseHabitSchema.extend({
  selectedDays: z.array(z.string()).min(1, HABIT_ERROR_MESSAGES.DAY_REQUIRED),
});

export type HabitFormSchema = z.infer<typeof habitFormSchema>;
export type CreateHabitSchema = z.infer<typeof createHabitSchema>;
export type UpdateHabitSchema = z.infer<typeof updateHabitSchema>;
