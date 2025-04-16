import { HabitFormData } from '@/types/habits.type';
import { toast } from '@/lib/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { habitFormSchema, HabitFormSchema } from '../schema/habit.schema';
import {
  createHabitData,
  getDefaultValues,
  isHabitDataUnchanged,
} from '../utils/habit-form.utils';
import { HABIT_TOAST_MESSAGES } from '@/constants/toast-messages.contants';

type UseHabitFormHandlerProps = {
  initialHabit?: HabitFormData;
  onSuccess?: (updatedHabit: HabitFormData) => void;
  onCancel: () => void;
};

export const useHabitFormHandler = ({
  initialHabit,
  onSuccess,
}: UseHabitFormHandlerProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitFormSchema>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: getDefaultValues(initialHabit),
  });

  const handleFormSubmit = async (data: HabitFormSchema) => {
    setIsSubmitting(true);
    try {
      const habitData = createHabitData(
        data.title,
        data.notes,
        data.selectedDays,
        data.categories,
        initialHabit?.id,
      );

      // 변경 사항이 없는지 확인
      if (isHabitDataUnchanged(habitData, initialHabit)) {
        toast(HABIT_TOAST_MESSAGES.INFO.NO_CHANGES);
        setIsSubmitting(false);
        return;
      }

      if (onSuccess) {
        await onSuccess(habitData);
        toast(
          initialHabit
            ? HABIT_TOAST_MESSAGES.SUCCESS.HABIT_UPDATE
            : HABIT_TOAST_MESSAGES.SUCCESS.HABIT_CREATE,
        );
      }
    } catch (error) {
      toast(HABIT_TOAST_MESSAGES.FAIL.HABIT_CREATE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    control,
    handleSubmit,
    errors,
    handleFormSubmit,
    isSubmitting,
  };
};
