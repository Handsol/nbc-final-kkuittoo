import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { SHOP_MESSAGE } from '@/constants/error-messages.constants';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { userItemId: string } },
) => {
  const { session, response } = await checkAuth();
  if (response) return response;

  const { userItemId } = params;

  try {
    const body = await request.json();
    const { isApplied } = body;

    if (typeof isApplied !== 'boolean') {
      return NextResponse.json(
        { error: SHOP_MESSAGE.ITEM.BAD_REQUEST },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }

    const updatedUserItem = await prisma.userItem.update({
      where: {
        id: userItemId,
        userId: session.user.id,
      },
      data: {
        isApplied,
      },
    });

    if (!updatedUserItem) {
      return NextResponse.json(
        { error: SHOP_MESSAGE.ITEM.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    return NextResponse.json(updatedUserItem);
  } catch (error) {
    console.error('Failed to update user item:', error);
    return NextResponse.json(
      { error: SHOP_MESSAGE.ITEM.APPLY_FAIL },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
