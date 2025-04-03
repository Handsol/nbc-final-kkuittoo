import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = {
  params: {
    id: string;
  };
};

/**
 * 단일 유저 팀 탈퇴 로직
 * 삭제 조건: 해당 유저가 해당 팀에 가입한 경우만 가능
 *
 * @param param : teamId
 * @returns
 */
export const DELETE = async (request: NextRequest, { params }: RouteParams) => {
  const session = await getServerSession(authOptions);
  // 인증되지 않은 유저인 경우 403 (Forbidden) 에러
  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { id } = params;
    const userId: string = session.user.id;
    const currentTeamData = await prisma.team.findUnique({
      where: { id },
      include: { teamMembers: true },
    });

    // 팀 데이터가 없는 경우 404 (Not Found) 에러
    if (!currentTeamData) {
      return NextResponse.json(
        { error: '해당 팀 정보가 없습니다.' },
        { status: 404 },
      );
    }

    // 해당 팀에 속한 유저가 아닌 경우 403 (Forbidden) 에러
    if (!currentTeamData.teamMembers.some((member) => member.id === userId)) {
      return NextResponse.json(
        { error: '해당 팀에 가입한 유저의 정보가 없습니다.' },
        { status: 403 },
      );
    }

    // delete의 경우 PK만 접근 가능
    // 아직 PK 설정이 안되어 있기 때문에 우선 deleteMany로 처리함
    await prisma.teamMember.deleteMany({
      where: { userId, teamId: id },
    });

    return NextResponse.json({ message: '해당 팀에서 탈퇴되었습니다.' });
  } catch (error) {
    return NextResponse.json(
      { error: '팀 탈퇴에 실패했습니다.' },
      { status: 500 },
    );
  }
};
