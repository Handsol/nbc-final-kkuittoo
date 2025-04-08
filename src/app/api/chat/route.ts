import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return new NextResponse('Team ID is required', { status: 400 });
    }

    const messages = await prisma.teamMessage.findMany({
      where: {
        teamId,
      },
      include: {
        users: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
