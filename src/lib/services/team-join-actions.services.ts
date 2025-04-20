'use server';
import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';

/**
 * 클라이언트 컴포넌트에서 호출 가능한 서버 액션
 * 사용자를 특정 팀에 가입시키는 서버 측 함수
 *
 * @param teamId 가입할 팀 ID
 * @param userId 가입할 사용자 ID
 * @returns 성공/실패 여부와 관련 메시지를 포함한 객체
 */
export const fetchJoinTeam = async (teamId: string, userId: string) => {
  try {
    // 기본 검증 - Prisma를 사용해 팀 데이터와 멤버 정보를 한 번에 조회
    // 여기서 Prisma는 서버에서만 실행되므로 DB 접근 정보가 외부로 노출되지 않음
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { teamMembers: true },
    });

    if (!team) throw new Error('팀을 찾을 수 없습니다.');
    if (team.teamMembers.some((m) => m.userId === userId)) {
      throw new Error('이미 팀 멤버입니다.');
    }
    if (team.teamMembers.length >= team.maxTeamSize) {
      throw new Error('팀 정원이 가득 찼습니다.');
    }

    // 팀 가입 처리 - Prisma를 통한 안전한 데이터베이스 작업 수행
    // 이 작업은 서버에서만 수행
    await prisma.teamMember.create({
      data: { userId, teamId, joinDate: new Date() },
    });

    // 캐시 갱신
    // 이 기능은 서버 액션에서만 사용 가능! 관련 페이지를 즉시 갱신!
    revalidatePath('/team');
    revalidatePath(`/team/${teamId}`);

    return { success: true, teamName: team.teamName };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '팀 가입 실패',
    };
  }
};
