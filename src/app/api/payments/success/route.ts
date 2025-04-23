import { PATH, PROJECT_URL } from '@/constants/path.constants';
import { prisma } from '@/lib/prisma';
import { fetchCreateTossConfirm } from '@/lib/services/toss-api.services';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
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

    // DB 데이터에 paymentKey, paymentType, amount 추가 + status 수정
    await prisma.payment.update({
      where: { orderId },
      data: {
        paymentKey,
        amount: Number(amount),
        paymentType,
        status: 'SUCCESS',
      },
    });

    // 성공 시 success 페이지로 이동
    return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.SUCCESS}`);
  } catch (error) {
    // 에러 발생시 fail 페이지로 이동
    console.error('결제 성공 후 DB 업데이트 실패 : ', error);
    return NextResponse.redirect(`${PROJECT_URL}${PATH.PAYMENTS.FAIL}`);
  }
};
