'use client';

import { useHabitsQuery } from '@/lib/queries/useHabitsQuery';
import { ACTIONBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import Title from '../common/Title';
import Text from '../common/Text';
import {
  getCurrentExp,
  getExpPercent,
  getUserLevel,
  MAX_EXP,
} from '@/lib/utils/user-level.utils';
import UserLevel from './profile/UserLevel';
import UserProgress from './profile/UserProgress';
import HabitForm from './habits/HabitForm';
import ActionButton from '../common/button/ActionButton';
import { useState } from 'react';
import { useCreateHabitMutation } from '@/lib/mutations/useHabitMutation';
import HabitItem from './habits/HabitItem';
import {
  DAY_LABELS,
  DAYS_OF_WEEK,
  HABIT_CATEGORIES,
  HABIT_CATEGORY_LABELS,
} from '@/constants/habits.constants';

type MyPageHabitsProps = {
  userId: string;
};

const MyPageHabits = ({ userId }: MyPageHabitsProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: habits = [], isPending } = useHabitsQuery(userId);
  const createMutation = useCreateHabitMutation(userId);

  const handleToggleCreate = () => {
    setIsCreating((prev) => !prev);
  };

  const totalPoints = habits.reduce((sum, habit) => {
    return sum + (habit.userPoints?.reduce((acc, p) => acc + p.points, 0) || 0);
  }, 0);

  const level = getUserLevel(totalPoints);
  const currentExp = getCurrentExp(totalPoints);
  const expPercent = getExpPercent(totalPoints);

  if (isPending) return <Text>로딩중</Text>;

  return (
    <section className="h-full bg-gray-100 p-6 rounded-3xl flex flex-col gap-4">
      {/* 헤더 영역 */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Title mode={TITLE_MODE.SECTION_TITLE} className="text-xl font-bold">
            HABITS
          </Title>
          <Text className="text-sm">({habits.length}/10)</Text>
        </div>
        <ActionButton
          mode={ACTIONBUTTON_MODE.PRIMARY_SMALL}
          onClick={handleToggleCreate}
          disabled={createMutation.isPending}
        >
          Add Habit
        </ActionButton>
      </header>

      {/* 유저 레벨 및 진행도 */}
      <article className="flex items-end gap-2">
        <UserLevel level={level} />
        <UserProgress
          currentExp={currentExp}
          maxExp={MAX_EXP}
          value={expPercent}
        />
      </article>

      {/* 요일 필터 UI */}
      <div className="flex">
        {DAYS_OF_WEEK.map((day, idx) => (
          <button
            key={day}
            onClick={() =>
              setSelectedDay((prev) => (prev === day ? null : day))
            }
            className={`flex-1 pb-2 text-sm font-medium transition border-b-4
        ${
          selectedDay === day
            ? 'border-slate-600 text-slate-800 font-semibold'
            : 'border-gray-300 text-gray-500'
        }`}
          >
            {DAY_LABELS[idx]}
          </button>
        ))}
      </div>

      {/* 태그 필터 UI */}
      <div className="flex flex-wrap gap-3">
        {/* All 버튼 추가 */}
        <button
          onClick={() => setSelectedCategory(null)}
          className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition
      ${
        selectedCategory === null
          ? 'bg-slate-700 text-white'
          : 'bg-white text-gray-700 border-gray-300'
      }`}
        >
          전체
        </button>

        {/* 기존 카테고리 버튼들 */}
        {HABIT_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() =>
              setSelectedCategory((prev) =>
                prev === category ? null : category,
              )
            }
            className={`min-w-[80px] px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition
        ${
          selectedCategory === category
            ? 'bg-slate-700 text-white'
            : 'bg-white text-gray-700 border-gray-300'
        }`}
          >
            {HABIT_CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      {/* 습관 목록 또는 폼 */}
      <article className="flex-1 overflow-y-auto">
        {isCreating ? (
          <HabitForm
            onCancel={handleToggleCreate}
            onSuccess={(habitData) => createMutation.mutate(habitData)}
          />
        ) : habits.length > 0 ? (
          <div className="space-y-4">
            {habits.map((habit) => (
              <HabitItem key={habit.id} habit={habit} userId={userId} />
            ))}
          </div>
        ) : (
          <Text>등록된 habit이 없습니다.</Text>
        )}
      </article>
    </section>
  );
};

export default MyPageHabits;
