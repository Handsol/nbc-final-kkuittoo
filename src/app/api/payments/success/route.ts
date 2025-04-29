import { PATH, PROJECT_URL } from '@/constants/path.constants';
import { prisma } from '@/lib/prisma';
import { fetchCreateTossConfirm } from '@/lib/services/toss-api.services';
import { checkAuth } from '@/lib/utils/auth-route-handler.utils';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  // 인증된 유저인지 확인하는 로직
  const { session, response } = await checkAuth();
  if (response) return response;

  // 응답 url에서 searchParams 가져오기
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const paymentKey = searchParams.get('paymentKey');
  const paymentType = searchParams.get('paymentType');
  const amount = searchParams.get('amount');

  // 파라미터 부족한 경우 fail 페이지로 이동
  if (!orderId || !paymentKey || !paymentType || !amount) {
    return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.FAIL}`);
  }

  try {
    // toss api 통신 로직
    const data = await fetchCreateTossConfirm({ orderId, amount, paymentKey });

    if (!data) {
      console.error('Toss 승인 실패:', data);
      return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.FAIL}`);
    }

    // transaction으로 DB 테이블 동시 접근
    await prisma.$transaction(async () => {
      // Payment 데이터에 paymentKey, paymentType, amount 추가 + status 수정
      const updatePaymentLog = await prisma.payment.update({
        where: { orderId },
        data: {
          paymentKey,
          amount: Number(amount),
          paymentType,
          status: 'SUCCESS',
        },
      });

      // SUCCESS 처리 이후 userItem 테이블에 데이터 추가
      const newUserItemData = await prisma.userItem.create({
        data: {
          orderId,
          userId: session.user.id,
          itemId: updatePaymentLog.itemId,
          isApplied: false,
        },
      });

      return { updatePaymentLog, newUserItemData };
    });

    // 성공 시 success 페이지로 이동
    return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.SUCCESS}`);
  } catch (error) {
    // 에러 발생시 fail 페이지로 이동
    console.error('결제 성공 후 DB 업데이트 실패 : ', error);
    return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.FAIL}`);
  }
};
