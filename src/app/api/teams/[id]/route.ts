import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * 단일 팀 데이터 조회

 * @param param : teamId
 * @returns singleTeamData : { 해당 팀 멤버 데이터[], 단일 팀 데이터 }
 */
export const GET = async ({ params }: RouteParams) => {
  try {
    const { id } = params;
    const singleTeamData = await prisma.team.findUnique({
      where: { id },
      include: { teamMembers: true },
    });

    //해당 데이터가 없는 경우 404(Not Found) 에러
    if (!singleTeamData) {
      return NextResponse.json(
        { error: '해당 팀 정보를 찾을 수 없습니다.' },
        { status: 404 },
      );
    }

    return NextResponse.json(singleTeamData);
  } catch (error) {
    return NextResponse.json(
      { error: `team/id=${params.id}의 데이터를 가져오는데 실패했습니다.` },
      { status: 500 },
    );
  }
};

/**
 * 단일 팀 데이터(teamBio, isOpened) 수정
 * 수정 조건: 해당 유저가 팀 생성자인 경우만 가능
 *
 * @param request : { teamBio, isOpened }
 * @param param : teamId
 */
export const PATCH = async (request: Request, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  // 인증되지 않은 유저인 경우 403 (Forbidden) 에러
  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const singleTeamData = await prisma.team.findUnique({
      where: { id },
    });

    // 팀 데이터가 없는 경우 404 (Not Found) 에러
    if (!singleTeamData) {
      return NextResponse.json(
        { error: '해당 팀 정보가 없습니다.' },
        { status: 404 },
      );
    }

    // 팀 생성자인지 확인 후, 아닌 경우 403 (Forbidden) 에러
    if (singleTeamData?.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: '수정은 팀 생성자만 가능합니다.' },
        { status: 403 },
      );
    }

    const { teamBio, isOpened } = await request.json();
    // 모든 정보 누락시 400 (Bad Request) 에러
    if (!teamBio && !isOpened) {
      return NextResponse.json(
        { error: '수정시 팀 소개/팀 공개여부 중 1개 이상 입력해야합니다.' },
        { status: 400 },
      );
    }

    const updatedTeamData = await prisma.team.update({
      where: { id },
      data: {
        ...(teamBio !== undefined && { teamBio }),
        ...(isOpened !== undefined && { isOpened }),
      },
    });

    return NextResponse.json(updatedTeamData);
  } catch (error) {
    return NextResponse.json(
      { error: 'Team 데이터 수정에 실패했습니다.' },
      { status: 500 },
    );
  }
};

/**
 * 단일 팀 데이터 삭제
 * 삭제 조건: 해당 유저가 팀 생성자이면서, 본인 외 남은 팀원이 없는 경우
 *
 * @param param : teamId
 * @returns
 */
export const DELETE = async ({ params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  // 인증되지 않은 유저인 경우 403 (Forbidden) 에러
  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const singleTeamData = await prisma.team.findUnique({
      where: { id },
      include: { teamMembers: true },
    });

    // 팀 데이터가 없는 경우 404 (Not Found) 에러
    if (!singleTeamData) {
      return NextResponse.json(
        { error: '해당 팀 정보가 없습니다.' },
        { status: 404 },
      );
    }

    // 팀 생성자를 제외한 다른 유저가 가입해있는 경우, 403 (Forbidden) 에러
    if (singleTeamData && singleTeamData.teamMembers.length > 1) {
      return NextResponse.json(
        {
          error: '팀 생성자 외 다른 유저가 존재합니다.',
        },
        { status: 403 },
      );
    }

    // 팀 생성자인지 확인 후, 아닌 경우 403 (Forbidden) 에러
    if (singleTeamData.ownerId !== session.user.id) {
      return NextResponse.json(
        { error: '삭제는 팀 생성자만 가능합니다.' },
        { status: 403 },
      );
    }

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({ message: '해당 team이 삭제되었습니다.' });
  } catch (error) {
    return NextResponse.json(
      { error: '팀 삭제에 실패했습니다.' },
      { status: 500 },
    );
  }
};
