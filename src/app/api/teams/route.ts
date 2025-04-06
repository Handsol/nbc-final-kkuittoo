import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { checkCreateTeamValidation } from '@/lib/utils/team-validation.utils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Team 전체 데이터 조회
 *
 * @returns teams : team 목록
 */
export const GET = async () => {
  try {
    const teamList = await prisma.team.findMany();

    return NextResponse.json(teamList);
  } catch (error) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.FETCH_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};

/**
 * 새로운 Team 데이터 생성

 * @param request : { teamName, teamBio, emblem, maxTeamSize, isOpened }
 * @returns newTeam : { 생성된 팀 데이터, 최초 추가된 팀 멤버 }
 */
export const POST = async (request: NextRequest) => {
  // 인증된 유저인지 확인하는 로직
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const requestBody = await request.json();

    // 유효성 검사
    const teamValidation = checkCreateTeamValidation(requestBody);
    if (teamValidation) return teamValidation;

    const newTeam = await prisma.$transaction(async () => {
      const createdTeam = await prisma.team.create({
        data: {
          teamName: requestBody.teamName,
          teamBio: requestBody.teamBio,
          emblem: requestBody.emblem,
          maxTeamSize: requestBody.maxTeamSize,
          ownerId: session.user.id,
        },
      });

      const newMember = await prisma.teamMember.create({
        data: {
          userId: session.user.id,
          teamId: createdTeam.id,
          joinDate: new Date(),
        },
      });

      return { createdTeam, newMember };
    });

    // 성공시 201 (Created) 응답
    return NextResponse.json(
      { message: TEAMS_MESSAGES.CREATE_SUCCESS, newTeam: newTeam },
      { status: HTTP_STATUS.CREATED },
    );
  } catch (error) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.CREATE_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
