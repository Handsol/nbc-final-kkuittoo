import { DAYS_OF_WEEK } from '@/constants/habits.constants';

type DayFilterProps = {
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
};

const DayFilter = ({ selectedDay, setSelectedDay }: DayFilterProps) => (
  <fieldset className="flex" aria-label="Day filter">
    {DAYS_OF_WEEK.map((day) => (
      <button
        key={day}
        onClick={() => setSelectedDay(selectedDay === day ? null : day)}
        className={`
            flex-1 pb-2 text-sm border-b-4 font-dohyeon transition-all duration-200 ease-in-out cursor-pointer  hover:text-sub hover:border-sub
            ${
              selectedDay === day
                ? 'border-main text-main font-semibold'
                : 'border-light-gray text-dark-gray'
            }
          `}
      >
        {day.charAt(0).toUpperCase() + day.slice(1)}
      </button>
    ))}
  </fieldset>
);

export default DayFilter;
