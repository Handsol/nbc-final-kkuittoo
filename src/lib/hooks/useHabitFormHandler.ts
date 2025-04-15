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
        toast({
          title: '알림',
          description: '변경된 내용이 없습니다.',
        });
        setIsSubmitting(false);
        return;
      }

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
