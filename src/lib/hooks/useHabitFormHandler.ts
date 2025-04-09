import { HabitFormData } from '@/types/habits.type';
import { createHabitData, getDefaultValues } from '@/lib/utils/habit.utils';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { habitFormSchema, HabitFormSchema } from '../schema/habit.schema';

type UseHabitFormHandlerProps = {
  initialHabit?: HabitFormData;
  onSuccess?: (updatedHabit: HabitFormData) => void;
  onCancel: () => void;
};

export const useHabitFormHandler = ({
  initialHabit,
  onSuccess,
  onCancel,
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

      if (onSuccess) {
        await onSuccess(habitData);
        toast({
          title: '성공',
          description: initialHabit
            ? '습관이 수정되었습니다.'
            : '습관이 생성되었습니다.',
        });
      }
    } catch (error) {
      toast({
        title: '오류',
        description: '처리 중 오류가 발생했습니다.',
      });
    } finally {
      setIsSubmitting(false);
      onCancel();
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
