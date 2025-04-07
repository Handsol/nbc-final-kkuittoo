import { HabitFormData } from '@/types/mypage.type';
import { useHabitForm } from '@/lib/hooks/useHabitForm';
import { createHabitData, toggleDay } from '@/lib/utils/habit.utils';
import HabitFormReapeatDays from './habit-form/HabitFormRepeatDays';
import HabitFormTags from './habit-form/HabitFormTags';
import { useEffect, useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { validateHabits } from '@/lib/utils/habit-validation.utils';
import HabitFormInput from './habit-form/HabitFormInput';

type HabitFormProps = {
  onCancel: () => void;
  initialHabit?: HabitFormData;
  onSuccess?: (updatedHabit: HabitFormData) => void;
};

const HabitForm = ({ onCancel, initialHabit, onSuccess }: HabitFormProps) => {
  const form = useHabitForm(initialHabit);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors = validateHabits({
      title: form.title.value,
      notes: form.notes.value,
      categories: form.category.value,
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // 폼을 제출해도 되는지 확인! 에러가 하나라도 없을 경우만 폼 제출 가능
  };

  // 입력값 변경 시 유효성 검사 실행
  useEffect(() => {
    validateForm();
  }, [form.title.value, form.notes.value]);

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
      <HabitFormInput
        id="title"
        label="TITLE"
        placeholder="습관 제목"
        value={form.title.value}
        onChange={(e) => form.title.setValue(e.target.value)}
        error={errors.title}
      />

      <HabitFormInput
        id="description"
        label="DESCRIPTION"
        placeholder="설명"
        value={form.notes.value}
        onChange={(e) => form.notes.setValue(e.target.value)}
        error={errors.notes}
      />

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
