import { PAYMENT_MESSAGE } from '@/constants/error-messages.constants';
import { HTTP_STATUS } from '@/constants/http-status.constants';
import { PATH, PROJECT_URL } from '@/constants/path.constants';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  // 응답 url에서 searchParams 가져오기
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  // orderId 누락시 400에러
  if (!orderId) {
    return NextResponse.json(
      { error: PAYMENT_MESSAGE.AFTER.NO_ORDERID },
      { status: HTTP_STATUS.BAD_REQUEST },
    );
  }

  try {
    await prisma.payment.update({
      where: { orderId },
      data: { status: 'FAIL' },
    });

    return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.FAIL}`);
  } catch (error) {
    return NextResponse.json(
      { error: PAYMENT_MESSAGE.AFTER.FAIL_FAIL },
      { status: HTTP_STATUS.SERVER_ERROR },
    );
  }
};
