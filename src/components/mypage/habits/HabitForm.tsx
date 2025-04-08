import { HabitFormData } from '@/types/habits.type';
import {
  createHabitData,
  getDefaultValues,
  toggleDay,
} from '@/lib/utils/habit.utils';
import HabitFormReapeatDays from './habit-form/HabitFormRepeatDays';
import HabitFormTags from './habit-form/HabitFormTags';
import { toast } from '@/hooks/use-toast';
import HabitFormInput from './habit-form/HabitFormInput';
import { Controller, useForm } from 'react-hook-form';
import {
  habitFormSchema,
  HabitFormSchema,
} from '@/lib/schema/habit-form.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

type HabitFormProps = {
  onCancel: () => void;
  initialHabit?: HabitFormData;
  onSuccess?: (updatedHabit: HabitFormData) => void;
};

const HabitForm: React.FC<HabitFormProps> = ({
  onCancel,
  initialHabit,
  onSuccess,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HabitFormSchema>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: getDefaultValues(initialHabit),
  });

  const onSubmit = (data: HabitFormSchema) => {
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

  return (
    <div className="p-4 bg-white rounded-xl shadow flex flex-col gap-6">
      <HabitFormInput
        id="title"
        label="TITLE"
        placeholder="습관 제목"
        {...register('title')}
        error={errors.title?.message}
      />

      <HabitFormInput
        id="description"
        label="DESCRIPTION"
        placeholder="설명"
        {...register('notes')}
        error={errors.notes?.message}
      />

      <Controller
        control={control}
        name="selectedDays"
        render={({ field }) => (
          <HabitFormReapeatDays
            selectedDays={field.value}
            setSelectedDays={field.onChange}
            toggleDay={toggleDay}
          />
        )}
      />

      <Controller
        control={control}
        name="categories"
        render={({ field }) => (
          <HabitFormTags category={field.value} setCategory={field.onChange} />
        )}
      />

      <div className="flex justify-center gap-4 mt-4">
        <ActionButton
          mode={ACTIONBUTTON_MODE.SECONDARY_SMALL}
          onClick={onCancel}
          className="px-6"
        >
          취소
        </ActionButton>
        <ActionButton
          mode={ACTIONBUTTON_MODE.PRIMARY_SMALL}
          onClick={handleSubmit(onSubmit)}
          className="px-6 bg-gray-600"
        >
          완료
        </ActionButton>
      </div>
    </div>
  );
};

export default HabitForm;
