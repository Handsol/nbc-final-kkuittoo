import { DAY_LABELS, DAYS_OF_WEEK } from '@/constants/habits.constants';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';
import HabitSelectButton from '../habit-filter/HabitSelectButton';
import ErrorMessage from '@/components/common/ErrorMessage';

type HabitFormRepeatDaysProps = {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  toggleDay: (days: string[], day: string) => string[];
  error?: string;
};
const HabitFormReapeatDays = ({
  selectedDays,
  setSelectedDays,
  toggleDay,
  error,
}: HabitFormRepeatDaysProps) => (
  <>
    <label className="block text-body-md font-semibold text-dark-gray font-dohyeon">
      주기
    </label>
    <div className="flex gap-[2px]">
      {DAYS_OF_WEEK.map((day, i) => (
        <HabitSelectButton
          key={day}
          mode={SELECTBUTTON_MODE.DAY}
          isSelected={selectedDays.includes(day)}
          onClick={() => setSelectedDays(toggleDay(selectedDays, day))}
          inputType="checkbox"
        >
          {DAY_LABELS[i]}
        </HabitSelectButton>
      ))}
    </div>
    <ErrorMessage>{error && error}</ErrorMessage>
  </>
);

export default HabitFormReapeatDays;
