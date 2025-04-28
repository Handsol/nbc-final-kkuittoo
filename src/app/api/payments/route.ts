import { PAYMENT_MESSAGE } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { prisma } from '@/lib/prisma';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { NextRequest, NextResponse } from 'next/server';

/**
 * 결제 승인 전에 DB Payment 테이블에 Pending 데이터 생성
 *
 * @param
 */
export const POST = async (request: NextRequest) => {
  // 인증된 유저인지 확인하는 로직
  const { session, response } = await checkAuth();
  if (response) return response;

  try {
    const requestBody = await request.json();
    const { orderId, userId, itemId, itemName } = requestBody;

    // 유효성 검사
    // 누락된 데이터가 있는 경우 400 에러
    if (!orderId || !userId || !itemId || !itemName) {
      return NextResponse.json(
        { error: PAYMENT_MESSAGE.NULL_DATA },
        { status: HTTP_STATUS.BAD_REQUEST },
      );
    }
    // 요청한 유저와 로그인한 유저가 동일한지 확인
    if (session.user.id !== userId) {
      return NextResponse.json(
        { error: PAYMENT_MESSAGE.INVALID_USER },
        { status: HTTP_STATUS.FORBIDDEN },
      );
    }

    // Payment 테이블에 데이터 추가 로직
    const newPayment = await prisma.payment.create({
      data: {
        orderId,
        userId,
        itemId,
        itemName,
      },
    });

    return NextResponse.json(
      { message: PAYMENT_MESSAGE.BEFORE.CREATE_SUCCESS, data: newPayment },
      { status: HTTP_STATUS.CREATED },
    );
  } catch (error) {
    return NextResponse.json(
      { error: PAYMENT_MESSAGE.BEFORE.CREATE_FAIL },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
