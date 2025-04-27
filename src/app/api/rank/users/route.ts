import { fetchGetFilteredUsersWithTotalPoints } from '@/lib/services/user-actions.services';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get('offset')) || 0;
  const limit = Number(searchParams.get('limit')) || 5;

  try {
    const users = await fetchGetFilteredUsersWithTotalPoints({ offset, limit });
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
