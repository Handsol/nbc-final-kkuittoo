import { HabitFormData } from '@/types/mypage.type';
import { useHabitForm } from '@/lib/hooks/use-habit-form';
import { createHabitData, toggleDay } from '@/lib/utils/habit.utils';
import HabitFormReapeatDays from './habit-form/HabitFormRepeatDays';
import HabitFormTags from './habit-form/HabitFormTags';

type HabitFormProps = {
  onCancel: () => void;
  initialHabit?: HabitFormData;
  onSuccess?: (updatedHabit: HabitFormData) => void;
};

const HabitForm = ({ onCancel, initialHabit, onSuccess }: HabitFormProps) => {
  const form = useHabitForm(initialHabit);

  const handleSubmit = () => {
    const habitData = createHabitData(
      form.title.value,
      form.notes.value,
      form.selectedDays.value,
      form.category.value,
      initialHabit?.id,
    );
    if (onSuccess) {
      onSuccess(habitData);
    } else {
      console.log('생성 완료', habitData);
    }
    onCancel();
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <label className="w-20 text-xs font-semibold text-gray-700">
          TITLE
        </label>
        <input
          className="flex-1 p-2 border rounded-full text-xs text-center"
          placeholder="습관 제목"
          value={form.title.value}
          onChange={(e) => form.title.setValue(e.target.value)}
        />
      </div>

      <div className="flex items-start gap-2">
        <label className="w-20 pt-2 text-xs font-semibold text-gray-700">
          DESCRIPTION
        </label>
        <input
          className="flex-1 p-2 border rounded-full text-xs text-center"
          placeholder="설명"
          value={form.notes.value}
          onChange={(e) => form.notes.setValue(e.target.value)}
        />
      </div>

      <HabitFormReapeatDays
        selectedDays={form.selectedDays.value}
        setSelectedDays={form.selectedDays.setValue}
        toggleDay={toggleDay}
      />

      <HabitFormTags
        category={form.category.value}
        setCategory={form.category.setValue}
      />

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={onCancel}
          className="px-6 py-2 bg-gray-300 rounded-full text-xs"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-gray-600 text-white rounded-full text-xs"
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default HabitForm;
