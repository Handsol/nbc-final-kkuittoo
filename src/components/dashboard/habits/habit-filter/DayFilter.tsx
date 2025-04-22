import { DAY_LABELS, DAYS_OF_WEEK } from '@/constants/habits.constants';

type DayFilterProps = {
  selectedDay: string[];
  setSelectedDay: (day: string[]) => void;
};

const DayFilter = ({ selectedDay, setSelectedDay }: DayFilterProps) => {
  const toggleDay = (day: string) => {
    if (selectedDay.includes(day)) {
      // 이미 선택된 요일이면 제거
      setSelectedDay(selectedDay.filter((d) => d !== day));
    } else {
      // 선택되지 않은 요일이면 추가
      setSelectedDay([...selectedDay, day]);
    }
  };
  return (
    <fieldset className="flex overflow-x-auto pb-2" aria-label="Day filter">
      {DAYS_OF_WEEK.map((day, i) => (
        <label
          key={day}
          className={`
            flex-shrink-0 w-[calc(100%/7)] pb-[8px] text-body-sm border-b-4 font-dohyeon 
            transition-all duration-200 ease-in-out cursor-pointer hover:text-sub hover:border-sub 
            text-center
            ${
              selectedDay.includes(day)
                ? 'border-main text-main font-semibold'
                : 'border-light-gray text-dark-gray'
            }
          `}
        >
          <input
            type="checkbox"
            checked={selectedDay.includes(day)}
            onChange={() => toggleDay(day)}
            className="hidden"
            aria-label={`Filter by ${day}`}
          />
          {DAY_LABELS[i]}
        </label>
      ))}
    </fieldset>
  );
};

export default DayFilter;
