import { prisma } from '@/lib/prisma';
import { pusher } from '@/lib/pusher';
import { authOptions } from '@/lib/utils/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  try {
    // 로그인된 사용자인지 확인
    const session = await getServerSession(authOptions);
    // 안 됐으면 요청 거부
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    // URL에 포함된 팀 ID를 가져오기
    const { searchParams } = new URL(req.url);
    const teamId = searchParams.get('teamId');

    // teamId가 없으면 잘못된 요청이라서 오류 반환
    if (!teamId) {
      return new NextResponse('Team ID is required', { status: 400 });
    }
    // 해당 팀 ID의 메시지를 모두 조회 (작성자 정보 포함, 시간순 정렬)
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

export const POST = async (req: Request) => {
  try {
    // 로그인된 사용자인지 확인
    const session = await getServerSession(authOptions);
    // 안 됐으면 요청 거부
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    // JSON으로 전달된 message, teamId 추출
    const body = await req.json();
    const { messages, teamId } = body;
    // messages, teamId 값이 없으면 오류
    if (!messages || !teamId) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Prisma를 통해 DB에 새 메시지 저장
    const message = await prisma.teamMessage.create({
      data: {
        messages,
        teamId,
        userId: session.user.id,
        createdAt: new Date(),
      },
      include: {
        users: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    // Pusher를 통해 실시간 메시지 전송 (teamId를 채널 이름으로 사용)
    await pusher.trigger(teamId, 'new-message', message);

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error creating message:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
