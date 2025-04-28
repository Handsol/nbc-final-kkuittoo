// app/api/user-items/[userItemId]/route.ts
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
    const existingUserItem = await prisma.userItem.findUnique({
      where: {
        id: userItemId,
        userId: session.user.id,
      },
    });

    if (!existingUserItem) {
      return NextResponse.json(
        { error: SHOP_MESSAGE.ITEM.NOT_FOUND },
        { status: HTTP_STATUS.NOT_FOUND },
      );
    }

    const updatedIsApplied = !existingUserItem.isApplied;

    if (updatedIsApplied) {
      // 현재 유저의 다른 적용된 아이템을 false로 변경
      await prisma.userItem.updateMany({
        where: {
          userId: session.user.id,
          isApplied: true,
          id: { not: userItemId },
        },
        data: {
          isApplied: false,
        },
      });
    }

    const updatedUserItem = await prisma.userItem.update({
      where: {
        id: userItemId,
        userId: session.user.id,
      },
      data: {
        isApplied: updatedIsApplied,
      },
    });

    return NextResponse.json(updatedUserItem);
  } catch (error) {
    console.error('Failed to update user item:', error);
    return NextResponse.json(
      { error: SHOP_MESSAGE.ITEM.APPLY_FAIL },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
