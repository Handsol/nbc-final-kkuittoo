import { TEAMS_MESSAGES } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { TEAM_VALIDATAION } from '@/constants/validation.constants';
import { TeamData } from '@/types/teams.type';
import { NextResponse } from 'next/server';

export const checkCreateTeamValidation = (
  body: Omit<TeamData, 'id' | 'createdAt' | 'ownerId' | 'isOpened'>,
) => {
  const { teamName, teamBio, emblem, maxTeamSize } = body;

  // 누락된 값 존재여부 판단
  if (!teamName || !teamBio || !emblem || !maxTeamSize) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.ADD_TEAM_REQUIRED },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  // 팀 이름 유효성 검사 : 2~10자, 빈칸 X
  if (
    teamName.length < TEAM_VALIDATAION.TEAM_NAME.MIN ||
    teamName.length > TEAM_VALIDATAION.TEAM_NAME.MAX ||
    !teamName.trim()
  ) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.TEAM_NAME_NOT_ALLOW },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  // 팀 소개 유효성 검사 : 5~20자, 빈칸 X
  if (
    teamBio.length < TEAM_VALIDATAION.TEAM_BIO.MIN ||
    teamBio.length > TEAM_VALIDATAION.TEAM_BIO.MAX ||
    !teamBio.trim()
  ) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.TEAM_BIO_NOT_ALLOW },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  return null;
};

export const checkUpdateTeamValidation = (body: Pick<TeamData, 'teamBio'>) => {
  const { teamBio } = body;

  //팀 소개 유효성 검사 : 5~20자, 빈칸X
  if (
    teamBio.length < TEAM_VALIDATAION.TEAM_BIO.MIN ||
    teamBio.length > TEAM_VALIDATAION.TEAM_BIO.MAX ||
    !teamBio.trim()
  ) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.TEAM_BIO_NOT_ALLOW },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  return null;
};

type teamData = {
  teamMembers: {
    id: string;
    userId: string;
    teamId: string;
    joinDate: Date;
  }[];
} & {
  id: string;
  createdAt: Date;
  ownerId: string;
  isOpened: boolean;
  teamName: string;
  teamBio: string;
  emblem: string;
  maxTeamSize: number;
};

export const checkDeleteTeamValidation = (
  teamData: teamData,
  userId: string,
) => {
  // 팀 생성자를 제외한 다른 유저가 가입해있는 경우, 403 (Forbidden) 에러
  if (teamData && teamData.teamMembers.length > 1) {
    return NextResponse.json(
      {
        error: TEAMS_MESSAGES.OTHERS_EXIST,
      },
      { status: HTTP_STATUS.FORBIDDEN },
    );
  }

  // 팀 생성자인지 확인 후, 아닌 경우 403 (Forbidden) 에러
  if (teamData.ownerId !== userId) {
    return NextResponse.json(
      { error: TEAMS_MESSAGES.OWNER_ONLY },
      { status: HTTP_STATUS.FORBIDDEN },
    );
  }

  return null;
};
