import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateHabit, HabitWithPoints } from '@/types/habits.type';
import { DAYS_OF_WEEK } from '@/constants/habits.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { HABIT_ERROR_MESSAGES } from '@/constants/error-messages.constants';
import { createHabitSchema } from '@/lib/schema/habit.schema';
import { Categories } from '@prisma/client';
import { getCurrentDayField } from '@/lib/utils/habit-filter.utils';
import { isCooldownActive } from '@/lib/utils/habit-points.utils';

/**
 * 사용자의 모든 Habit 목록을 조회
 * @param {NextRequest} request - Habit 목록 요청
 * @returns {Promise<NextResponse>} - 조회된 Habit 목록 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 목록 조회
 * - `userPoints` 포함, 생성일 내림차순 정렬
 */
export const GET = async (request: NextRequest) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { searchParams } = new URL(request.url);
    const skip = Number(searchParams.get('skip') ?? 0);
    const take = Number(searchParams.get('take') ?? 5);
    const days = searchParams.get('days')?.split(',') ?? [];
    const category = searchParams.get('category') as Categories | null;

    const where = {
      userId: session.user.id,
      ...(days.length > 0 && {
        AND: days.map((day) => ({ [day]: true })),
      }),
      ...(category && { categories: category }),
    };

    const currentDayField = getCurrentDayField();
    const now = new Date();

    // 1. 먼저 현재 요일 습관 조회
    const currentDayHabits = (await prisma.habit.findMany({
      where: { ...where, [currentDayField]: true },
      include: { userPoints: true },
      orderBy: { createdAt: 'desc' },
    })) as HabitWithPoints[];

    // 2. 활성화/비활성화 분류
    const [enabledHabits, disabledHabits] = currentDayHabits.reduce(
      ([enabled, disabled], habit) => {
        const isEnabled = !isCooldownActive(habit.userPoints, now);
        return isEnabled
          ? [[...enabled, habit], disabled]
          : [enabled, [...disabled, habit]];
      },
      [[], []] as [HabitWithPoints[], HabitWithPoints[]],
    );

    // 3. 다른 요일 습관 조회
    const otherHabits = (await prisma.habit.findMany({
      where: { ...where, [currentDayField]: false },
      include: { userPoints: true },
      orderBy: { createdAt: 'desc' },
    })) as HabitWithPoints[];

    // 4. 전체 습관 (활성화 > 비활성화 > 다른 요일)
    const allHabits = [...enabledHabits, ...disabledHabits, ...otherHabits];
    const paginatedHabits = allHabits.slice(skip, skip + take);

    const totalHabits = await prisma.habit.count({ where });

    return NextResponse.json({
      habits: paginatedHabits.map((habit) => ({
        ...habit,
        userPoints: habit.userPoints || [],
        isEnabled: enabledHabits.includes(habit),
      })),
      totalHabits,
    });
  } catch (error) {
    console.error('Habit 조회 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};

/**
 * 새로운 Habit 생성
 * @param {NextRequest} request - 새로운 Habit 생성 요청
 * @returns {Promise<NextResponse>} - 생성된 Habit 또는 에러
 * @throws {Error} 데이터베이스 생성 실패했을 때
 * @description
 * - 인증된 사용자가 새로운 Habit 생성
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인 - zod
 */
export const POST = async (request: NextRequest) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const body = (await request.json()) as CreateHabit;

    // Zod 유효성 검사
    const result = createHabitSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.errors[0].message;
      return NextResponse.json(
        { error: firstError },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const { title, notes, categories, ...days } = result.data;

    const dayData: Record<string, boolean> = {};
    for (const day of DAYS_OF_WEEK) {
      dayData[day] = days[day] ?? false;
    }
    const habit = await prisma.habit.create({
      data: {
        title: title.trim(),
        notes,
        categories,
        ...dayData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(habit, { status: HTTP_STATUS.CREATED });
  } catch (error) {
    console.error('Habit 생성 에러:', error);
    return NextResponse.json(
      { error: HABIT_ERROR_MESSAGES.CREATE_FAILED },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR },
    );
  }
};
