import { HabitFormData } from '@/types/habits.type';
import { createHabitData, getDefaultValues } from '@/lib/utils/habit.utils';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import {
  habitFormSchema,
  HabitFormSchema,
} from '@/lib/schema/habit-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitFormSchema>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: getDefaultValues(initialHabit),
  });

  const handleFormSubmit = (data: HabitFormSchema) => {
    const habitData = createHabitData(
      data.title,
      data.notes,
      data.selectedDays,
      data.categories,
      initialHabit?.id,
    );
    if (onSuccess) {
      onSuccess(habitData);
      toast({
        title: '성공',
        description: initialHabit
          ? '습관이 수정되었습니다.'
          : '습관이 생성되었습니다.',
      });
    }
    onCancel();
  };

  return { register, control, handleSubmit, errors, handleFormSubmit };
};
