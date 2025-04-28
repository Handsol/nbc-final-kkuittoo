import { fetchGetFilteredTeamsWithTotalPoints } from '@/lib/services/team-actions.services';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 5; // 기본 5개씩

  try {
    const teams = await fetchGetFilteredTeamsWithTotalPoints({ offset, limit });
    return NextResponse.json(teams);
  } catch (error) {
    console.error('[GET /api/rank/teams] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
