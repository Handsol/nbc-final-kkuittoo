import { TeamRankContent } from '@/components/rank/team/TeamRankContent';

// ISR
export const revalidate = 60; // 추후 시간 설정 필요

export default function TeamRankPage() {
  return <TeamRankContent />;
}
