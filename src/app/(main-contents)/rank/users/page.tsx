import { UserRankContent } from './UserRankContent';

export const revalidate = 60; // 추후 시간 설정 필요

export default function UserRankPage() {
  return (
    <div className="w-3/4 p-8 mx-auto bg-gray-200 rounded-lg">
      {/* 유저 랭킹 콘텐츠 랜더링 */}
      <UserRankContent />
    </div>
  );
}
