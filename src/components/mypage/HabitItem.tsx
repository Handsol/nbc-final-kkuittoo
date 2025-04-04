'use client';

import { Habit, UserPoint } from '@prisma/client';

type HabitItemProps = {
  habit: Pick<
    Habit,
    | 'id'
    | 'title'
    | 'notes'
    | 'mon'
    | 'tue'
    | 'wed'
    | 'thu'
    | 'fri'
    | 'sat'
    | 'sun'
  > & {
    userPoints: UserPoint[];
  };
};

const HabitItem = ({ habit }: HabitItemProps) => {
  const handleComplete = async () => {
    console.log('포인트 추가하기:', habit.id);
  };

  // 현재 요일 확인
  const now = new Date();
  const dayOfWeek = now.getDay();
  const days = [
    habit.sun,
    habit.mon,
    habit.tue,
    habit.wed,
    habit.thu,
    habit.fri,
    habit.sat,
  ];
  const isValidDay = days[dayOfWeek];

  // 최근 1시간 내 포인트 추가 여부
  const lastPoint = habit.userPoints
    .filter((up) => up.getTime !== null)
    .sort(
      (a, b) => new Date(b.getTime!).getTime() - new Date(a.getTime!).getTime(),
    )[0];
  const isCooldownActive = lastPoint
    ? now < new Date(new Date(lastPoint.getTime!).getTime() + 60 * 60 * 1000)
    : false;

  // 버튼 비활성화 조건
  const isDisabled = !isValidDay || isCooldownActive;

  return (
    <article className="flex items-center gap-4 p-4 border rounded-3xl bg-white shadow-sm hover:shadow-md transition-shadow">
      <button
        className={`w-8 h-8 font-extrabold rounded-full flex items-center justify-center transition-colors ${
          isDisabled
            ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
        onClick={handleComplete}
        disabled={isDisabled}
      >
        +
      </button>
      <div className="flex-1">
        <h2 className="font-semibold text-gray-800 truncate">{habit.title}</h2>
        <p className="text-sm text-gray-600 truncate">{habit.notes}</p>
      </div>
    </article>
  );
};

export default HabitItem;
