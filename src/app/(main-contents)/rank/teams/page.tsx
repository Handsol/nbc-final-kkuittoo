import { TeamRankContent } from './TeamRankContent';

// ISR
export const revalidate = 60; // 추후 시간 설정 필요

export default function TeamRankPage() {
  return (
    <div className="w-3/4 p-8 mx-auto bg-gray-200 rounded-lg">
      {/* 팀 랭킹 콘텐츠 랜더링 */}
      <TeamRankContent />
    </div>
  );
}
