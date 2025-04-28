import { useState, useEffect } from 'react';
import {
  DAYS_OF_WEEK,
  REPEAT_OPTION_DAYS,
  REPEAT_OPTIONS,
} from '@/constants/habits.constants';
import { toggleDay } from '@/lib/utils/habit-form.utils';

export const useHabitRepeatDays = (initialDays: string[] = []) => {
  const [selectedDays, setSelectedDays] = useState<string[]>(initialDays);
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

  // 주기 옵션 클릭 핸들러
  const handleOptionClick = (option: string) => {
    const newSelectedOptions = [option];
    const newSelectedDays = [...REPEAT_OPTION_DAYS[option]];

    setSelectedOptions(newSelectedOptions);
    setSelectedDays(newSelectedDays);
  };

  // 월~일 요일 클릭 핸들러
  const handleDayClick = (day: string) => {
    const newSelectedDays = toggleDay(selectedDays, day);
    setSelectedDays(newSelectedDays);
  };

  return {
    selectedDays,
    selectedOptions,
    handleOptionClick,
    handleDayClick,
    setSelectedDays,
  };
};
