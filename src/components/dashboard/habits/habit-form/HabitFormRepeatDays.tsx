import {
  DAY_LABELS,
  DAYS_OF_WEEK,
  REPEAT_OPTION_DAYS,
  REPEAT_OPTION_LABELS,
  REPEAT_OPTIONS,
} from '@/constants/habits.constants';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';
import HabitSelectButton from '../habit-filter/HabitSelectButton';
import ErrorMessage from '@/components/common/ErrorMessage';
import { useEffect, useState } from 'react';
import { toggleDay } from '@/lib/utils/habit-form.utils';

type HabitFormRepeatDaysProps = {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  error?: string;
};

const HabitFormRepeatDays = ({
  selectedDays,
  setSelectedDays,
  error,
}: HabitFormRepeatDaysProps) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // selectedDays에 따라 상태 동기화
  useEffect(() => {
    const newOptions: string[] = [];

    // 매일
    if (
      selectedDays.length === DAYS_OF_WEEK.length &&
      DAYS_OF_WEEK.every((day) => selectedDays.includes(day))
    ) {
      newOptions.push(REPEAT_OPTIONS.EVERY_DAY);
    }
    // 주중
    else if (
      selectedDays.length ===
        REPEAT_OPTION_DAYS[REPEAT_OPTIONS.WEEKDAYS].length &&
      REPEAT_OPTION_DAYS[REPEAT_OPTIONS.WEEKDAYS].every((day) =>
        selectedDays.includes(day),
      ) &&
      selectedDays.every((day) =>
        REPEAT_OPTION_DAYS[REPEAT_OPTIONS.WEEKDAYS].includes(day),
      )
    ) {
      newOptions.push(REPEAT_OPTIONS.WEEKDAYS);
    }
    // 주말
    else if (
      selectedDays.length ===
        REPEAT_OPTION_DAYS[REPEAT_OPTIONS.WEEKENDS].length &&
      REPEAT_OPTION_DAYS[REPEAT_OPTIONS.WEEKENDS].every((day) =>
        selectedDays.includes(day),
      ) &&
      selectedDays.every((day) =>
        REPEAT_OPTION_DAYS[REPEAT_OPTIONS.WEEKENDS].includes(day),
      )
    ) {
      newOptions.push(REPEAT_OPTIONS.WEEKENDS);
    }

    setSelectedOptions(newOptions);
  }, [selectedDays]);

  // 반복 옵션 클릭 핸들러
  const handleOptionClick = (option: string) => {
    const newSelectedOptions = [option];
    const newSelectedDays = [...REPEAT_OPTION_DAYS[option]];

    setSelectedOptions(newSelectedOptions);
    setSelectedDays(newSelectedDays);
  };

  // 개별 요일 클릭 핸들러
  const handleDayClick = (day: string) => {
    const newSelectedDays = toggleDay(selectedDays, day);
    setSelectedDays(newSelectedDays);
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center gap-[16px]">
        <label className="block text-body-md font-semibold text-dark-gray font-dohyeon">
          주기
        </label>
        {/* 반복 옵션: 매일, 주중, 주말 */}
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
