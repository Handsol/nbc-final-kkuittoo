import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HABIT_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

// habit의 기본 스키마
const baseHabitSchema = z.object({
  title: z
    .string()
    .min(HABIT_VALIDATION.TITLE.MIN_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH)
    .max(HABIT_VALIDATION.TITLE.MAX_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH)
    .transform((val) => val.trim()), // 앞뒤 공백제거
  notes: z
    .string()
    .min(HABIT_VALIDATION.NOTES.MIN_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH)
    .max(HABIT_VALIDATION.NOTES.MAX_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH),
  categories: z.string().min(1, HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED),
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

//새로운 습관 생성 시 사용되는 스키마. 기본 습관 필드와 요일 필드를 모두 포함하며, 기본 필드는 필수
export const createHabitSchema = baseHabitSchema.merge(daysSchema);

// 기존 습관 수정 시 사용되는 스키마. 기본 습관 필드는 모두 선택적(optional)이며 요일 필드를 포함
export const updateHabitSchema = baseHabitSchema.partial().merge(daysSchema);

// 폼 입력용 습관 스키마
export const habitFormSchema = baseHabitSchema.extend({
  selectedDays: z.array(z.string()),
});

export type HabitFormSchema = z.infer<typeof habitFormSchema>;
export type CreateHabitSchema = z.infer<typeof createHabitSchema>;
export type UpdateHabitSchema = z.infer<typeof updateHabitSchema>;
