import { Habit } from "@prisma/client";

/**
 * 오늘 날짜 객체를 반환 (시간은 00:00:00으로 설정)
 */
export const getToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };
  
  /**
   * 주어진 날짜가 오늘인지 확인
   */
  export const isToday = (date: Date): boolean => {
    const today = getToday();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  /**
   * 현재 요일에 해당하는 습관 수행 여부를 반환하는 유틸리티 함수
   * @param {Habit} habit - 확인할 habit
   * @returns {boolean} - 오늘이 습관 수행 요일인지 여부
   */
  export const getCurrentDayStatus = (habit: Habit) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); //현재 요일을 숫자로 가져옴
    const days = [
      habit.sun,
      habit.mon,
      habit.tue,
      habit.wed,
      habit.thu,
      habit.fri,
      habit.sat,
    ];
    return days[dayOfWeek]; //오늘 요일에 해당하는 인덱스의 값을 반환
  };