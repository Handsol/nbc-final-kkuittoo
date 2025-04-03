import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
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
 * @param param : teamMemberId
 * @returns
 */
export const DELETE = async (request: NextRequest, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const userId: string = session.user.id;
    const currentTeamMemberData = await prisma.teamMember.findUnique({
      where: { id },
    });

    // 해당 팀멤버 데이터가 없는 경우 404 (Not Found) 에러
    if (!currentTeamMemberData) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.MEMBER_NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    // 해당 유저가 아닌 경우 403 (Forbidden) 에러
    if (currentTeamMemberData.userId !== userId) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.PRIVATE_ACCESS },
        { status: HTTP_STATUS.FORBIDDEN },
      );
    }

    // delete의 경우 PK만 접근 가능
    // 아직 PK 설정이 안되어 있기 때문에 우선 deleteMany로 처리함
    await prisma.teamMember.delete({
      where: { id },
    });

    return NextResponse.json({ message: TEAMS_MESSAGES.LEAVE_SUCCESS });
  } catch (error) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.LEAVE_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
