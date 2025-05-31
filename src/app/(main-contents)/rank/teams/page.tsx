import { TeamRankContent } from '@/components/rank/team/TeamRankContent';

// ISR
export const revalidate = 60;

export default function TeamRankPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return <TeamRankContent searchParams={searchParams} />;
}
