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
      className="px-[36px] py-[48px] bg-white rounded-xl shadow flex flex-col gap-[24px] w-[380px]
      animate-fade-down
      "
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
