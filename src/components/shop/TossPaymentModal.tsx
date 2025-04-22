'use client';

import { useEffect, useRef, useState } from 'react';
import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { CommonModal } from '../common/CommonModal';
import ActionButton from '../common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { useTossWidget } from '@/lib/hooks/useTossWidget';
import { PATH, PROJECT_URL } from '@/constants/path.constants';
import { useToast } from '@/lib/hooks/use-toast';

type TossPaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  paymentInfo: {
    userId: string;
    userEmail: string | null | undefined;
    itemId: string;
    itemName: string;
    amount: number;
  };
};

const TossPaymentModal = ({
  isOpen,
  onClose,
  paymentInfo,
}: TossPaymentModalProps) => {
  const { userId, userEmail, itemId, itemName, amount } = paymentInfo;
  const { tossPayments, isReadyToPay, clientKey, customerKey } = useTossWidget({
    isOpen,
    userId,
    amount,
  });

  const { toast } = useToast();

  const handlePayment = async () => {
    if (!tossPayments) return;

    try {
      // await widgets.requestPayment({
      //   orderId: `order_${userId}_${Date.now()}`,
      //   orderName: itemName,
      //   successUrl: `${PROJECT_URL}${PATH.PAYMENTS.SUCCESS}`,
      //   failUrl: `${PROJECT_URL}${PATH.PAYMENTS.FAIL}`,
      //   customerEmail: userEmail,
      //   customerName: userId,
      //   customerMobilePhone: null,
      // });

      //orderID를 만들어서 미리 넣기
      //status => pending로 해서 데이터 넣고
      //리다이렉트

      //임시 테스트용 입니다!!
      const payment = await tossPayments.requestPayment({
        orderId: `order_${Date.now()}`,
        orderName: '테스트아이템',
        successUrl: `${PROJECT_URL}${PATH.PAYMENTS.SUCCESS}`,
        failUrl: `${PROJECT_URL}${PATH.PAYMENTS.FAIL}`,
        customerEmail: 'customer123@gmail.com',
        customerName: '김토스',
        customerMobilePhone: null,
      });

      console.log('payment', payment);
      //여기랑 successURL에서도 데이터 인서트 테스트 해보기
    } catch (error) {
      console.error(error);
      toast({
        title: '결제에 실패했습니다',
        description: '결제 실패!',
      });
    }
  };

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <div className="w-full flex flex-col items-center">
        <div id="payment-method" className="w-full" />
        <div id="agreement" className="w-full" />

        <ActionButton
          mode={ACTIONBUTTON_MODE.PRIMARY}
          onClick={handlePayment}
          disabled={!isReadyToPay}
        >
          결제하기
        </ActionButton>
      </div>
    </CommonModal>
  );
};

export default TossPaymentModal;
