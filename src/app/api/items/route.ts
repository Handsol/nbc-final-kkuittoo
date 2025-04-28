import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { SHOP_MESSAGE } from '@/constants/error-messages.constants';

export const GET = async () => {
  // userId에 해당하는 모든 상품 불러오기
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const userId = session.user.id;
    const itemList = await prisma.item.findMany({
      include: {
        userItems: {
          where: { userId },
        },
      },
    });

    return NextResponse.json(itemList);
  } catch (error) {
    console.error('Failed to fetch items:', error);

    return NextResponse.json(
      { error: SHOP_MESSAGE.ITEM.FETCH_FAIL },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
