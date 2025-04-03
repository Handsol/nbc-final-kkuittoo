import { TeamRankContent } from './team-rank-content';

// ISR
export const revalidate = 60; // 추후 시간 설정 필요

export default function TeamRankPage() {
  return <TeamRankContent />; // 클라이언트 컴포넌트 렌더링
}
