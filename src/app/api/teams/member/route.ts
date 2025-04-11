import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import {
  fetchGetMyTeamData,
  fetchGetMyTeamMemberData,
  fetchGetTeamData,
} from '@/lib/services/team-actions.services';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { checkTeamPassword } from '@/lib/utils/team-validation.utils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 새로운 TeamMember 데이터 생성(가입)
 *
 * @param request
 * @returns
 */
export const POST = async (request: NextRequest) => {
  //인증된 유저인지 확인하는 로직
  const { session, response } = await checkAuth();
  if (response) return response;

  const userId = session.user.id;

  try {
    const requestBody = await request.json();
    const { teamId, password } = requestBody;

    // 누락된 데이터가 있을 경우 400 에러
    if (!teamId) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.JOIN_REQUIRED },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 이미 가입한 팀이 있는 경우 400 에러
    const existing = await fetchGetMyTeamData(userId);
    if (existing) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.ALREADY_EXIST },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 해당 팀 공개 여부 + 팀 멤버 수에 따른 분기처리
    const teamData = await fetchGetTeamData(teamId);
    const teamMembers = await fetchGetMyTeamMemberData(teamId);
    if (!teamData || !teamMembers) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    // 팀 최대 인원이 초과하였을 경우 400 에러
    const maxNumber = teamData.maxTeamSize;
    const currentMemberNumber = teamMembers.length;

    if (maxNumber <= currentMemberNumber) {
      return NextResponse.json(
        { error: TEAMS_MESSAGES.TEAM_SIZE_MAX },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    // 비공개 팀 : 비밀번호가 틀리면 400 에러
    const isOpened = teamData.isOpened;

    if (!isOpened) {
      const passwordValidate = checkTeamPassword(teamId, password);
      if (!passwordValidate) {
        return NextResponse.json(
          { error: TEAMS_MESSAGES.WRONG_PASSWORD },
          { status: HTTP_STATUS.BAD_REQUEST },
        );
      }
    }

    //가입 로직
    const newMember = await prisma.teamMember.create({
      data: {
        userId: session.user.id,
        teamId,
        joinDate: new Date(),
      },
    });

    return NextResponse.json(
      { message: TEAMS_MESSAGES.JOIN_SUCCESS, data: newMember },
      { status: HTTP_STATUS.CREATED },
    );
  } catch (error) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.JOIN_FAILED },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
