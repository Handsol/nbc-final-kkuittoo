import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';
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
      { error: 'team 목록을 가져오는데 실패했습니다.' },
      { status: 500 },
    );
  }
};

/**
 * 새로운 Team 데이터 생성

 * @param request : { teamName, teamBio, emblem, maxTeamSize }
 * @returns newTeam : { 생성된 팀 데이터, 최초 추가된 팀 멤버 }
 */
export const POST = async (request: NextRequest) => {
  // 인증된 유저인지 확인하는 로직
  const session = await getServerSession(authOptions);
  // 인증되지 않은 유저인 경우 403 (Forbidden) 에러
  if (!session || !session.user) {
    return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 403 });
  }

  try {
    const { teamName, teamBio, emblem, maxTeamSize } = await request.json();

    // 정보 누락시 400 (Bad Request) 에러
    if (!teamName || !teamBio || !emblem || !maxTeamSize) {
      return NextResponse.json(
        { error: '팀이름, 팀소개, 엠블럼, 최대인원수는 필수입니다.' },
        { status: 400 },
      );
    }

    const newTeam = await prisma.$transaction(async () => {
      const createdTeam = await prisma.team.create({
        data: {
          teamName,
          teamBio,
          emblem,
          maxTeamSize,
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
      { message: '팀 생성 완료', newTeam: newTeam },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'team 목록에 새 데이터를 추가하는데 실패했습니다.' },
      { status: 500 },
    );
  }
};
