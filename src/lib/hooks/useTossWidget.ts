import { ANONYMOUS, loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { useEffect, useRef, useState } from 'react';

type useTossWidgetProps = {
  isOpen: boolean;
  amount: number;
  userId: string;
};

export const useTossWidget = ({
  isOpen,
  amount,
  userId,
}: useTossWidgetProps) => {
  const [tossPayments, setTossPayments] = useState<any>(null);
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const clientKey = process.env.NEXT_PUBLIC_TOSS_WIDGET_CLIENT_KEY!;
  const customerKey = userId || ANONYMOUS;

  // 토스페이먼츠 SDK 및 위젯 초기화
  const initializeTossPayments = async () => {
    try {
      const tossSdk = await loadTossPayments(clientKey);
      const tossWidgets = tossSdk.widgets({ customerKey });

      // await tossWidgets.setAmount({
      //   currency: 'KRW',
      //   value: amount,
      // });

      // 임시 테스트용 입니다!
      await tossWidgets.setAmount({
        currency: 'KRW',
        value: 5000,
      });

      // 결제 수단 & 약관 동의 위젯 렌더링
      await Promise.all([
        tossWidgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        tossWidgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setTossPayments(tossWidgets);
      setIsReadyToPay(true);
    } catch (error) {
      console.error('Toss 위젯 초기화 실패:', error);
      setIsReadyToPay(false);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setTossPayments(null);
      setIsReadyToPay(false);
      return;
    }

    initializeTossPayments();
  }, [isOpen, clientKey, amount]);

  return { tossPayments, isReadyToPay, clientKey, customerKey };
};
