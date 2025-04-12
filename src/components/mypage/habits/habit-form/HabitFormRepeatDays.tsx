import { DAYS_OF_WEEK } from '@/constants/habits.constants';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';
import HabitSelectButton from '../HabitSelectButton';

type HabitFormRepeatDaysProps = {
  selectedDays: string[];
  setSelectedDays: (days: string[]) => void;
  toggleDay: (days: string[], day: string) => string[];
};
const HabitFormReapeatDays = ({
  selectedDays,
  setSelectedDays,
  toggleDay,
}: HabitFormRepeatDaysProps) => (
  <>
    <label className="block mb-2 text-xs font-semibold text-dark-gray font-dohyeon">
      Repeats
    </label>
    <div className="flex gap-2">
      {DAYS_OF_WEEK.map((day) => (
        <HabitSelectButton
          key={day}
          mode={SELECTBUTTON_MODE.DAY}
          isSelected={selectedDays.includes(day)}
          onClick={() => setSelectedDays(toggleDay(selectedDays, day))}
          inputType="checkbox"
        >
          {day.charAt(0).toUpperCase() + day.slice(1)}
        </HabitSelectButton>
      ))}
    </div>
  </>
);

export default HabitFormReapeatDays;
