import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { HABIT_VALIDATION } from '@/constants/validation.constants';
import { z } from 'zod';

export const habitFormSchema = z.object({
  title: z
    .string()
    .min(HABIT_VALIDATION.TITLE.MIN_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH)
    .max(HABIT_VALIDATION.TITLE.MAX_LENGTH, HABIT_ERROR_MESSAGES.TITLE_LENGTH),
  notes: z
    .string()
    .min(HABIT_VALIDATION.NOTES.MIN_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH)
    .max(HABIT_VALIDATION.NOTES.MAX_LENGTH, HABIT_ERROR_MESSAGES.NOTES_LENGTH),
  categories: z.string().min(1, HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED),
  selectedDays: z.array(z.string()),
});

export type HabitFormSchema = z.infer<typeof habitFormSchema>;
