import { HabitFormData } from '@/types/mypage.type';
import { useHabitForm } from '@/lib/hooks/useHabitForm';
import { createHabitData, toggleDay } from '@/lib/utils/habit.utils';
import HabitFormReapeatDays from './habit-form/HabitFormRepeatDays';
import HabitFormTags from './habit-form/HabitFormTags';
import CommonInputBar from '@/components/common/CommonInputBar';
import { HABIT_VALIDATION } from '@/constants/habits.constants';
import { useEffect, useState } from 'react';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { toast } from '@/hooks/use-toast';

type HabitFormProps = {
  onCancel: () => void;
  initialHabit?: HabitFormData;
  onSuccess?: (updatedHabit: HabitFormData) => void;
};

const HabitForm = ({ onCancel, initialHabit, onSuccess }: HabitFormProps) => {
  const form = useHabitForm(initialHabit);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    const title = form.title.value.trim();
    if (
      !title ||
      title.length < HABIT_VALIDATION.TITLE.MIN_LENGTH ||
      title.length > HABIT_VALIDATION.TITLE.MAX_LENGTH
    ) {
      newErrors.title = HABIT_ERROR_MESSAGES.TITLE_LENGTH;
    }

    const notes = form.notes.value.trim();
    if (
      !notes ||
      notes.length < HABIT_VALIDATION.NOTES.MIN_LENGTH ||
      notes.length > HABIT_VALIDATION.NOTES.MAX_LENGTH
    ) {
      newErrors.notes = HABIT_ERROR_MESSAGES.NOTES_LENGTH;
    }

    const categories = form.category.value.trim();
    if (!categories) {
      newErrors.categories = HABIT_ERROR_MESSAGES.CATEGORY_REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 입력값 변경 시 유효성 검사 실행
  useEffect(() => {
    validateForm();
  }, [
    form.title.value,
    form.notes.value,
    form.category.value,
    form.selectedDays.value,
  ]);

  const handleSubmit = () => {
    if (!validateForm()) {
      toast({ title: '입력 오류', description: '입력값을 확인해주세요.' });
      return;
    }

    const habitData = createHabitData(
      form.title.value,
      form.notes.value,
      form.selectedDays.value,
      form.category.value,
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
      <div className="flex items-center gap-4 relative">
        <label
          htmlFor="title"
          className="w-20 text-xs font-semibold text-gray-700 shrink-0"
        >
          TITLE
        </label>
        <div className="flex-1 relative">
          <CommonInputBar
            id="title"
            placeholder="습관 제목"
            value={form.title.value}
            onChange={(e) => form.title.setValue(e.target.value)}
          />
          {errors.title && (
            <p className="absolute top-full left-0 mt-1 text-red-500 text-xs w-[calc(100%-15px)]">
              {errors.title}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 relative">
        <label
          htmlFor="description"
          className="w-20 text-xs font-semibold text-gray-700 shrink-0"
        >
          DESCRIPTION
        </label>
        <div className="flex-1 relative">
          <CommonInputBar
            id="description"
            placeholder="설명"
            value={form.notes.value}
            onChange={(e) => form.notes.setValue(e.target.value)}
          />
          {errors.notes && (
            <p className="absolute top-full left-0 mt-1 text-red-500 text-xs w-[calc(100%-15px)]">
              {errors.notes}
            </p>
          )}
        </div>
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
          className="px-6 py-2 bg-gray-600 text-white rounded-full text-xs disabled:bg-gray-400"
          disabled={Object.keys(errors).length > 0}
        >
          완료
        </button>
      </div>
    </div>
  );
};

export default HabitForm;
