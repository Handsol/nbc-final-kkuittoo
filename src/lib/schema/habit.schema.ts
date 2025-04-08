import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HABIT_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

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
  categories: z.string().min(1, HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED),
});

const daysSchema = z.object({
  mon: z.boolean().optional(),
  tue: z.boolean().optional(),
  wed: z.boolean().optional(),
  thu: z.boolean().optional(),
  fri: z.boolean().optional(),
  sat: z.boolean().optional(),
  sun: z.boolean().optional(),
});

export const createHabitSchema = baseHabitSchema.merge(daysSchema);

export const updateHabitSchema = baseHabitSchema.partial().merge(daysSchema);

export const habitFormSchema = baseHabitSchema.extend({
  selectedDays: z.array(z.string()),
});

export type HabitFormSchema = z.infer<typeof habitFormSchema>;
export type CreateHabitSchema = z.infer<typeof createHabitSchema>;
export type UpdateHabitSchema = z.infer<typeof updateHabitSchema>;
