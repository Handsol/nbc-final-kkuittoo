import {
  DAY_LABELS,
  DAYS_OF_WEEK,
  REPEAT_OPTION_LABELS,
  REPEAT_OPTIONS,
} from '@/constants/habits.constants';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';
import HabitSelectButton from '../habit-filter/HabitSelectButton';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useEffect } from 'react';
import { useHabitRepeatDays } from '@/lib/hooks/useHabitRepeatDays';
import clsx from 'clsx';

type HabitFormRepeatDaysProps = {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  error?: string;
};

const HabitFormRepeatDays = ({
  selectedDays: initialDays,
  setSelectedDays: onDaysChange,
  error,
}: HabitFormRepeatDaysProps) => {
  const { selectedOptions, handleOptionClick, handleDayClick, selectedDays } =
    useHabitRepeatDays(initialDays);

  // 상태 변경할때마다 상위 컴포넌트에 알려주기
  useEffect(() => {
    onDaysChange(selectedDays);
  }, [selectedDays, onDaysChange]);

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[16px]">
        <label
          className={clsx(
            'block text-body-md font-semibold text-dark-gray',
            'font-dohyeon',
          )}
        >
          주기
        </label>
        {/* 주기 옵션: 매일, 주중, 주말 */}
        <div className="flex gap-2 flex-wrap">
          {Object.values(REPEAT_OPTIONS).map((option) => (
            <HabitSelectButton
              key={option}
              mode={SELECTBUTTON_MODE.REPEAT_OPTION}
              isSelected={selectedOptions.includes(option)}
              onClick={() => handleOptionClick(option)}
              inputType="checkbox"
            >
              {REPEAT_OPTION_LABELS[option]}
            </HabitSelectButton>
          ))}
        </div>
      </div>

      {/* 개별 요일 선택 */}
      <div className="flex gap-[2px]">
        {DAYS_OF_WEEK.map((day, i) => (
          <HabitSelectButton
            key={day}
            mode={SELECTBUTTON_MODE.DAY}
            isSelected={selectedDays.includes(day)}
            onClick={() => handleDayClick(day)}
            inputType="checkbox"
          >
            {DAY_LABELS[i]}
          </HabitSelectButton>
        ))}
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </div>
  );
};

export default HabitFormRepeatDays;
