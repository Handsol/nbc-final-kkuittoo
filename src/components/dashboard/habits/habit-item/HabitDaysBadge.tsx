import { Habit } from '@prisma/client';
import Text from '@/components/common/Text';
import { getKoreanDayInfoArray, getToday } from '@/lib/utils/habit-date.utils';

const HabitDaysBadge = ({ habit }: { habit: Habit }) => {
  const today = getToday().getDay(); // 일요일(0) ~ 토요일(6)
  const habitDays = getKoreanDayInfoArray();

  // 월요일(0)~일요일(6) 순서에 맞게
  const adjustedTodayIndex = today === 0 ? 6 : today - 1;

  const activeDays = habitDays.filter(({ key }) => habit[key as keyof Habit]);

  return (
    <div className="flex flex-wrap justify-start gap-[2px] max-w-full mb-2">
      {activeDays.map(({ key, label }) => {
        const isToday = habitDays[adjustedTodayIndex].key === key;
        return (
          <Text
            key={key}
            className={`px-[3px] py-[2px] rounded-full text-body-xs leading-none 
                ${isToday ? 'bg-main text-light-gray' : 'bg-light-gray text-medium-gray'}`}
          >
            {label}
          </Text>
        );
      })}
    </div>
  );
};

export default HabitDaysBadge;
