import { Habit } from '@prisma/client';
import Text from '@/components/common/Text';
import { getToday } from '@/lib/utils/habit-date.utils';

const HabitDaysBadge = ({ habit }: { habit: Habit }) => {
  const today = getToday().getDay(); // 일요일(0) ~ 토요일(6)
  const habitDays = [
    { key: 'sun', label: '일' },
    { key: 'mon', label: '월' },
    { key: 'tue', label: '화' },
    { key: 'wed', label: '수' },
    { key: 'thu', label: '목' },
    { key: 'fri', label: '금' },
    { key: 'sat', label: '토' },
  ];

  const activeDays = habitDays.filter(({ key }) => habit[key as keyof Habit]);

  return (
    <div className="flex flex-wrap justify-start gap-1 max-w-full mt-1">
      {activeDays.length > 0 ? (
        activeDays.map(({ key, label }) => {
          const isToday = habitDays[today].key === key;
          return (
            <span
              key={label}
              className={`px-2 py-[2px] rounded-full text-body-xs leading-none 
                ${isToday ? 'bg-main text-white' : 'bg-gray-100'}`}
            >
              {label}
            </span>
          );
        })
      ) : (
        <Text className="text-body-xs">요일 미설정</Text>
      )}
    </div>
  );
};

export default HabitDaysBadge;
