import { UserRankContent } from '@/components/rank/user/UserRankContent';
export const revalidate = 60; // 추후 시간 설정 필요

export default function UserRankPage() {
  return <UserRankContent />;
}
