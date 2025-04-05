import {
  DAYS_OF_WEEK,
  DAY_LABELS,
  HABIT_CATEGORIES,
} from '@/constants/habits.constants';
import { HabitFormData } from '@/types/mypage.type';
import { useHabitForm } from '@/lib/hooks/use-habit-form';
import { createHabitData, toggleDay } from '@/lib/utils/habit.utils';

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

      <div>
        <label className="block mb-2 text-xs font-semibold text-gray-700">
          Repeats
        </label>
        <div className="flex gap-2">
          {DAYS_OF_WEEK.map((day, idx) => (
            <label
              key={day}
              className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-xs font-medium border transition ${
                form.selectedDays.value.includes(day)
                  ? 'bg-slate-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={form.selectedDays.value.includes(day)}
                onChange={() =>
                  form.selectedDays.setValue(
                    toggleDay(form.selectedDays.value, day),
                  )
                }
              />
              {DAY_LABELS[idx]}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-xs font-semibold text-gray-700">
          Tags
        </label>
        <div className="flex flex-wrap gap-3">
          {HABIT_CATEGORIES.map((cat) => (
            <label
              key={cat}
              className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition ${
                form.category.value === cat
                  ? 'bg-slate-700 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="category"
                className="hidden"
                checked={form.category.value === cat}
                onChange={() => form.category.setValue(cat)}
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

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
