import { DAYS_OF_WEEK, DAY_LABELS } from '@/constants/habits.constants';

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
      {DAYS_OF_WEEK.map((day, i) => (
        <label
          key={day}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-xs font-medium border transition font-dohyeon ${
            selectedDays.includes(day)
              ? 'bg-sub text-white'
              : 'bg-white text-dark-gray border-light-gray'
          }`}
        >
          <input
            type="checkbox"
            className="hidden"
            checked={selectedDays.includes(day)}
            onChange={() => setSelectedDays(toggleDay(selectedDays, day))}
          />
          {DAY_LABELS[i]}
        </label>
      ))}
    </div>
  </>
);

export default HabitFormReapeatDays;
