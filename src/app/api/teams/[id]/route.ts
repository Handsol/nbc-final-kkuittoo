import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import {
  checkDeleteTeamValidation,
  checkUpdateTeamValidation,
} from '@/lib/utils/team-validation.utils';
import { NextRequest, NextResponse } from 'next/server';

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
export const GET = async (request: NextRequest, { params }: RouteParams) => {
  try {
    const { id } = params;
    const singleTeamData = await prisma.team.findUnique({
      where: { id },
      include: { teamMembers: true },
    });

    //해당 데이터가 없는 경우 404(Not Found) 에러
    if (!singleTeamData) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    return NextResponse.json(singleTeamData);
  } catch (error) {
    return NextResponse.json(
      { error: `teamID : ${params.id} / ${TEAMS_MESSAGES.FETCH_FAILED}` },
      { status: HTTP_STATUS.SERVER_ERROR },
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
export const PATCH = async (request: NextRequest, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const singleTeamData = await prisma.team.findUnique({
      where: { id },
    });

    // 팀 데이터가 없는 경우 404 (Not Found) 에러
    if (!singleTeamData) {
      return NextResponse.json(
        { error: `teamID : ${params.id} / ${TEAMS_MESSAGES.NOT_FOUND}` },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    const { teamBio, isOpened } = await request.json();

    // 팀 소개 유효성 검사와 생성자 여부 판단
    const teamUpdateValidation = checkUpdateTeamValidation(
      teamBio,
      singleTeamData.ownerId,
      session.user.id,
    );
    if (teamUpdateValidation) return teamUpdateValidation;

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
      { error: TEAMS_MESSAGES.UPDATE_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
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
export const DELETE = async (request: NextRequest, { params }: RouteParams) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const { id } = params;
    const singleTeamData = await prisma.team.findUnique({
      where: { id },
      include: { teamMembers: true },
    });

    // 팀 데이터가 없는 경우 404 (Not Found) 에러
    if (!singleTeamData) {
      return NextResponse.json(
        { error: `teamID : ${params.id} / ${TEAMS_MESSAGES.NOT_FOUND}` },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    // 유효성 검사 : 팀 생성자 제외 다른 유저 있는지 여부, 팀 생성자 여부
    const teamDeleteValidation = checkDeleteTeamValidation(
      singleTeamData,
      session.user.id,
    );
    if (teamDeleteValidation) return teamDeleteValidation;

    await prisma.team.delete({
      where: { id },
    });

    return NextResponse.json({
      message: `teamID : ${params.id} / ${TEAMS_MESSAGES.DELETE_SUCCESS}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.DELETE_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
