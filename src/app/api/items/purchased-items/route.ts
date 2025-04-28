import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { SHOP_MESSAGE } from '@/constants/error-messages.constants';

export const GET = async () => {
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

    const purchasedItemList = itemList.filter(
      (item) => !!item.userItems.length,
    );

    return NextResponse.json(purchasedItemList);
  } catch (error) {
    console.error('Failed to fetch purchased items:', error);

    return NextResponse.json(
      { error: SHOP_MESSAGE.ITEM.FETCH_FAIL },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
