import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { UpdateHabit } from '@/types/mypage.type';
import { getServerSession } from 'next-auth';

type RouteParams = {
  params: { id: string };
};

/**
 *
 * 클릭한 Habit의 정보를 조회
 * @param {Request} - GET 요청
 * @returns {Promise<NextResponse>} - 조회된 Habit 또는 에러
 * @throws {Error} 데이터베이스 조회 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 조회
 * - `userPoints` 포함
 */
export async function GET(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const habit = await prisma.habit.findUnique({
      where: { id },
      include: { userPoints: true },
    });

    if (!habit) {
      return NextResponse.json(
        { error: 'Habit을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: '이 Habit을 조회할 권한이 없습니다.' },
        { status: 403 },
      );
    }

    return NextResponse.json(habit);
  } catch (error) {
    console.error('Habit 조회 에러:', error);
    return NextResponse.json(
      { error: 'Habit을 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
}

/**
 * Habit 수정
 * @param {Request} - PATCH 요청
 * @returns {Promise<NextResponse>} - 수정된 Habit 또는 에러
 * @throws {Error} 데이터베이스 업데이트 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit 수정
 * - 유효성 검사를 통해 데이터 형식과 길이를 확인
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const body = (await request.json()) as UpdateHabit;
    const { title, notes, categories, mon, tue, wed, thu, fri, sat, sun } =
      body;

    const habit = await prisma.habit.findUnique({ where: { id } });
    if (!habit) {
      return NextResponse.json(
        { error: 'Habit을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: '이 Habit을 수정할 권한이 없습니다.' },
        { status: 403 },
      );
    }

    // 유효성 검사
    if (title && (title.trim().length < 1 || title.trim().length > 15)) {
      return NextResponse.json(
        { error: '제목은 1~15자여야 하며, 앞뒤 공백을 허용하지 않습니다.' },
        { status: 400 },
      );
    }
    if (notes && (notes.length < 1 || notes.length > 50)) {
      return NextResponse.json(
        { error: '메모는 1~50자여야 합니다.' },
        { status: 400 },
      );
    }
    if (categories !== undefined && categories.trim() === '') {
      return NextResponse.json(
        { error: '카테고리는 1개 이상 선택해야 합니다.' },
        { status: 400 },
      );
    }

    const updatedHabit = await prisma.habit.update({
      where: { id },
      data: {
        ...(title !== undefined && { title: title.trim() }),
        ...(notes !== undefined && { notes }),
        ...(categories !== undefined && { categories }),
        ...(mon !== undefined && { mon }),
        ...(tue !== undefined && { tue }),
        ...(wed !== undefined && { wed }),
        ...(thu !== undefined && { thu }),
        ...(fri !== undefined && { fri }),
        ...(sat !== undefined && { sat }),
        ...(sun !== undefined && { sun }),
      },
    });

    return NextResponse.json(updatedHabit);
  } catch (error) {
    console.error('Habit 수정 에러:', error);
    return NextResponse.json(
      { error: 'Habit 수정에 실패했습니다.' },
      { status: 500 },
    );
  }
}

/**
 * Habit 삭제
 * @param {Request} - DELETE 요청
 * @returns {Promise<NextResponse>} - Habit 삭제 또는 에러
 * @throws {Error} 데이터베이스 삭제 실패했을 때
 * @description
 * - 인증된 사용자가 자신의 Habit만 삭제
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const habit = await prisma.habit.findUnique({ where: { id } });

    if (!habit) {
      return NextResponse.json(
        { error: 'Habit을 찾을 수 없습니다.' },
        { status: 404 },
      );
    }
    if (habit.userId !== session.user.id) {
      return NextResponse.json(
        { error: '이 Habit을 삭제할 권한이 없습니다.' },
        { status: 403 },
      );
    }

    await prisma.habit.delete({ where: { id } });
    return NextResponse.json(
      { message: 'Habit이 삭제되었습니다.' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Habit 삭제 에러:', error);
    return NextResponse.json(
      { error: 'Habit 삭제에 실패했습니다.' },
      { status: 500 },
    );
  }
}
