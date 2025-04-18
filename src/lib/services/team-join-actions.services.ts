'use server';
import { prisma } from '../prisma';
import { revalidatePath } from 'next/cache';

/**
 * 클라이언트 컴포넌트에서 호출 가능한 서버 액션
 * 사용자를 특정 팀에 가입시키는 서버 측 함수
 *
 * 이 함수가 서버 액션으로 구현된 이유:
 * 1. 보안: Prisma 같은 DB 클라이언트는 서버에서만 안전하게 실행되어야 함
 *    - 클라이언트에서 직접 Prisma를 호출하면 DB 연결 정보가 노출될 위험이 있음
 *    - 서버 액션을 통해 데이터베이스 접근은 서버에서만 이루어지도록 격리
 *
 * 2. 성능: Prisma는 Node.js 환경용으로 설계되어 클라이언트 번들에 포함되면 용량 증가
 *    - 브라우저에서 실행해도 결국 서버를 통해 DB에 접근해야 함
 *    - 서버 액션을 사용하면 불필요한 중간 API 레이어 없이 직접 호출 가능
 *
 * 3. Next.js: App Router는 서버/클라이언트 책임 분리를 권장
 *    - 서버 컴포넌트/액션: DB 접근, 데이터 페칭
 *    - 클라이언트 컴포넌트: UI 렌더링, 사용자 인터랙션
 *
 * 처리 과정:
 * 1. 팀 존재 여부, 중복 가입, 정원 초과 등 기본 검증
 * 2. 검증 통과 시 TeamMember 테이블에 새 레코드 생성
 * 3. 관련 페이지 캐시 갱신으로 UI 즉시 반영
 *
 * @param teamId 가입할 팀 ID
 * @param userId 가입할 사용자 ID
 * @returns 성공/실패 여부와 관련 메시지를 포함한 객체
 */
export const fetchJoinTeam = async (teamId: string, userId: string) => {
  try {
    // 1. 기본 검증 - Prisma를 사용해 팀 데이터와 멤버 정보를 한 번에 조회
    // 여기서 Prisma는 서버에서만 실행되므로 DB 접근 정보가 외부로 노출되지 않음
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { teamMembers: true }, // 관계형 데이터를 한 번에 가져와 DB 호출 최소화
    });

    if (!team) throw new Error('팀을 찾을 수 없습니다.');
    if (team.teamMembers.some((m) => m.userId === userId)) {
      throw new Error('이미 팀 멤버입니다.');
    }
    if (team.teamMembers.length >= team.maxTeamSize) {
      throw new Error('팀 정원이 가득 찼습니다.');
    }

    // 2. 팀 가입 처리 - Prisma를 통한 안전한 데이터베이스 작업 수행
    // 이 작업은 서버에서만 수행되어 SQL 인젝션 등의 공격으로부터 보호됨
    await prisma.teamMember.create({
      data: { userId, teamId, joinDate: new Date() },
    });

    // 3. 캐시 갱신 - Next.js의 서버 사이드 캐싱 시스템 활용
    // 이 기능은 서버 액션에서만 사용 가능하며 관련 페이지를 즉시 갱신함
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

/**
 * 사용자가 이미 가입한 팀이 있는지 확인하는 서버 함수
 *
 * Prisma를 사용하는 이유:
 * - 타입 안전성: TypeScript와 완벽하게 통합되어 런타임 오류 방지
 * - 쿼리 최적화: 필요한 필드만 선택적으로 가져와 성능 최적화 (select 옵션)
 * - 보안: SQL 인젝션 방지 및 매개변수화된 쿼리 자동 생성
 *
 * 서버 액션으로 구현해 클라이언트 컴포넌트에서 안전하게 호출 가능
 *
 * @param userId 조회할 사용자 ID
 * @returns 사용자가 가입한 팀 ID 정보 (없으면 null)
 */
export const fetchGetTeamMember = async (userId: string) => {
  // Prisma의 findFirst로 첫 번째 일치 레코드만 가져와 불필요한 데이터 전송 방지
  // select로 필요한 필드(teamId)만 가져와 네트워크 트래픽 최소화
  return await prisma.teamMember.findFirst({
    where: { userId },
    select: { teamId: true },
  });
};
