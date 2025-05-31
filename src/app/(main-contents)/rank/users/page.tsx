import { UserRankContent } from '@/components/rank/user/UserRankContent';
export const revalidate = 60;

export default function UserRankPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <UserRankContent searchParams={searchParams} />;
}
