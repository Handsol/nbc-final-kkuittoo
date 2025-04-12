import { HabitFormData } from '@/types/habits.type';
import { useHabitFormHandler } from '@/lib/hooks/useHabitFormHandler';
import HabitFormActions from './habit-form/HabitFormActions';
import HabitFormFields from './habit-form/HabitFormFields';

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
    errors,
    handleFormSubmit,
    isSubmitting,
  } = useHabitFormHandler({
    initialHabit,
    onSuccess,
    onCancel,
  });

  return (
    <form
      className="p-4 bg-white rounded-xl shadow flex flex-col gap-6 w-[380px]"
      onSubmit={handleSubmit(handleFormSubmit)}
      aria-label="Habit form"
    >
      <HabitFormFields register={register} control={control} errors={errors} />
      <HabitFormActions
        onCancel={onCancel}
        onSubmit={handleSubmit(handleFormSubmit)}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default HabitForm;
