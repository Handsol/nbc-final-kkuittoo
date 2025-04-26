import { PAYMENT_MESSAGE } from '@/constants/error-messages.constants';
import { TOSS_API_URL } from '@/constants/path.constants';
import { prisma } from '@/lib/prisma';

type TossConfirmProps = {
  orderId: string;
  amount: string;
  paymentKey: string;
};

export const fetchCreateTossConfirm = async ({
  orderId,
  amount,
  paymentKey,
}: TossConfirmProps) => {
  const secretKey = process.env.TOSS_WIDGET_SECRET_KEY;
  const encodedHeader =
    'Basic ' + Buffer.from(`${secretKey}:`).toString('base64');

  try {
    const response = await fetch(TOSS_API_URL, {
      method: 'POST',
      headers: {
        Authorization: encodedHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount: Number(amount),
        paymentKey,
      }),
    });

    if (!response.ok) {
      await prisma.payment.update({
        where: { orderId },
        data: {
          status: 'FAIL',
        },
      });
      throw new Error(PAYMENT_MESSAGE.AFTER.CONFIRM_FAIL);
    }

    return response.json();
  } catch (error) {
    console.error('fetchCreateTossConfirm 에러: ', error);
    throw new Error(PAYMENT_MESSAGE.AFTER.CONFIRM_FAIL);
  }
};
