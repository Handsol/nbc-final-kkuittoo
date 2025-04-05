'use client';

import { useState } from 'react';
import { Habit } from '@prisma/client';
import {
  DAYS_OF_WEEK,
  DAY_LABELS,
  HABIT_CATEGORIES,
} from '@/constants/habits.constants';

type HabitFormProps = {
  onCancel: () => void;
  initialHabit?: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>;
  onSuccess?: (
    updatedHabit: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'>,
  ) => void;
};

const HabitForm = ({ onCancel, initialHabit, onSuccess }: HabitFormProps) => {
  const [title, setTitle] = useState(initialHabit?.title || '');
  const [notes, setNotes] = useState(initialHabit?.notes || '');
  const [selectedDays, setSelectedDays] = useState<string[]>(
    initialHabit
      ? DAYS_OF_WEEK.filter(
          (day) => initialHabit[day as keyof typeof initialHabit],
        )
      : [],
  );
  const [category, setCategory] = useState(
    initialHabit?.categories || HABIT_CATEGORIES[0],
  );

  const handleToggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleSubmit = () => {
    const habitData: Omit<Habit, 'userId' | 'createdAt' | 'userPoints'> = {
      id: initialHabit?.id || Math.random().toString(),
      title,
      notes,
      categories: category,
      mon: selectedDays.includes('mon'),
      tue: selectedDays.includes('tue'),
      wed: selectedDays.includes('wed'),
      thu: selectedDays.includes('thu'),
      fri: selectedDays.includes('fri'),
      sat: selectedDays.includes('sat'),
      sun: selectedDays.includes('sun'),
    };
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="flex items-start gap-2">
        <label className="w-20 pt-2 text-xs font-semibold text-gray-700">
          DESCRIPTION
        </label>
        <input
          className="flex-1 p-2 border rounded-full text-xs text-center"
          placeholder="설명"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
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
                selectedDays.includes(day)
                  ? 'bg-slate-600 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={selectedDays.includes(day)}
                onChange={() => handleToggleDay(day)}
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
                category === cat
                  ? 'bg-slate-700 text-white'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="category"
                className="hidden"
                checked={category === cat}
                onChange={() => setCategory(cat)}
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
