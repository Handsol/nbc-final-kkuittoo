import { DAYS_OF_WEEK } from '@/constants/habits.constants';

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
    <fieldset className="flex" aria-label="Day filter">
      {DAYS_OF_WEEK.map((day) => (
        <button
          key={day}
          onClick={() => toggleDay(day)}
          className={`
            flex-1 pb-2 text-sm border-b-4 font-dohyeon transition-all duration-200 ease-in-out cursor-pointer hover:text-sub hover:border-sub
            ${
              selectedDay.includes(day)
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
};

export default DayFilter;
