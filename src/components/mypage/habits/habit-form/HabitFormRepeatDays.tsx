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
            onChange={() => setSelectedDays(toggleDay(selectedDays, day))}
          />
          {DAY_LABELS[idx]}
        </label>
      ))}
    </div>
  </div>
);

export default HabitFormReapeatDays;
