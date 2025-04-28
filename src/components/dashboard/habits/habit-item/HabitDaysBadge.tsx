import { Habit } from '@prisma/client';
import Text from '@/components/common/Text';
import { getActiveDays, isTodayDay } from '@/lib/utils/habit-date.utils';

const HabitDaysBadge = ({ habit }: { habit: Habit }) => {
  const activeDays = getActiveDays(habit);
  return (
    <div className="flex flex-wrap justify-start gap-[2px] max-w-full mb-2">
      {activeDays.map(({ key, label }) => {
        return (
          <Text
            key={key}
            className={`px-[3px] py-[2px] rounded-full text-body-xs leading-none 
              ${isTodayDay(key) ? 'bg-main text-light-gray' : 'bg-light-gray text-medium-gray'}`}
          >
            {label}
          </Text>
        );
      })}
    </div>
  );
};

export default HabitDaysBadge;
