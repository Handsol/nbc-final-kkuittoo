import { HabitFormSchema } from '@/lib/schema/habit.schema';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import HabitFormInput from './HabitFormInput';
import HabitFormTags from './HabitFormTags';
import HabitFormRepeatDays from './HabitFormRepeatDays';
import { toggleDay } from '@/lib/utils/habit-form.utils';

type HabitFormFieldsProps = {
  register: UseFormRegister<HabitFormSchema>;
  control: Control<HabitFormSchema>;
  errors: FieldErrors<HabitFormSchema>;
};

const HabitFormFields = ({
  register,
  control,
  errors,
}: HabitFormFieldsProps) => (
  <section className="flex flex-col gap-[12px]" aria-label="Habit form fields">
    <HabitFormInput
      id="title"
      label="제목"
      placeholder="습관 제목"
      {...register('title')}
      error={errors.title?.message}
      aria-invalid={!!errors.title}
    />
    <HabitFormInput
      id="description"
      label="설명"
      placeholder="설명"
      {...register('notes')}
      error={errors.notes?.message}
      aria-invalid={!!errors.notes}
    />
    <Controller
      control={control}
      name="selectedDays"
      render={({ field }) => (
        <HabitFormRepeatDays
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
  </section>
);

export default HabitFormFields;
