import { PAYMENT_MESSAGE } from '@/constants/error-messages.constants';
import { API_PATH } from '@/constants/path.constants';

/**
 * 결제 승인 전에 새로운 payment 기록 생성
 * amount(가격), paymentKey, paymentType은 누락된 데이터가 생성
 *
 * @param data
 */
type PaymentLogInitData = {
  orderId: string;
  userId: string;
  itemId: string;
  itemName: string;
};
export const fetchCreateInitPaymentLog = async (data: PaymentLogInitData) => {
  try {
    const response = await fetch(API_PATH.PAYMENTS.PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
      }),
    });

    if (!response.ok) {
      throw new Error(PAYMENT_MESSAGE.BEFORE.CREATE_FAIL);
    }

    return response.json();
  } catch (error) {
    console.error('fetchCreateInitPaymentLog 에러: ', error);
    throw new Error(PAYMENT_MESSAGE.BEFORE.CREATE_FAIL);
  }
};
