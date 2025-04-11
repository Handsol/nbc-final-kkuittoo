import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { EMBLEM } from '@/constants/team-contents.constants';
import { prisma } from '@/lib/prisma';
import { fetchGetTeamTotalPoints } from '@/lib/services/team-actions.services';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { checkCreateTeamValidation } from '@/lib/utils/team-validation.utils';
import { TeamWithPoints } from '@/types/rank.type';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Team 전체 데이터 조회
 *
 * @returns teams : team 목록
 */
export const GET = async () => {
  try {
    // 모든 팀 데이터와 팀 멤버 정보 가져오기
    const teamList = await prisma.team.findMany({
      include: { teamMembers: true },
    });
    // 각 팀의 총 포인트와 멤버 수 계산
    const teamsWithPoints: TeamWithPoints[] = await Promise.all(
      teamList.map(async (team) => {
        // fetchGetTeamTotalPoints로 팀의 총 포인트 계산
        const { teamTotalPoints } = await fetchGetTeamTotalPoints(team.id);
        return {
          ...team, // 기존 팀 데이터
          totalPoints: teamTotalPoints, // 총 포인트
          memberCount: team.teamMembers.length, // 멤버 수
        };
      }),
    );

    return NextResponse.json(
      teamsWithPoints.sort((a, b) => b.totalPoints - a.totalPoints),
    );
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
          emblem: EMBLEM[requestBody.emblem as 'LION' | 'OWL' | 'CAT' | 'DEER'],
          maxTeamSize: requestBody.maxTeamSize,
          isOpened: requestBody.isOpened,
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
