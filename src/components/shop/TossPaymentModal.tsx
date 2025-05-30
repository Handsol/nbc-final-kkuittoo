'use client';

import { CommonModal } from '../common/CommonModal';
import ActionButton from '../common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { useTossWidget } from '@/lib/hooks/useTossWidget';
import { API_PATH, PROJECT_URL } from '@/constants/path.constants';
import { useToast } from '@/lib/hooks/use-toast';
import { fetchCreateInitPaymentLog } from '@/lib/services/payment-client.services';

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
  const { tossPayments, isReadyToPay } = useTossWidget({
    isOpen,
    userId,
    amount,
  });

  const { toast } = useToast();

  const handlePayment = async () => {
    if (!tossPayments) return;

    const orderId = `order_${userId}_${Date.now()}`;
    const paymentInitData = {
      orderId,
      userId,
      itemId,
      itemName,
    };

    // 1. DB에 초기 payment log 입력
    try {
      const response = await fetchCreateInitPaymentLog(paymentInitData);
    } catch (error) {
      console.error('payment 초기 데이터 생성 시 에러 발생: ', error);
      toast({
        title: '결제에 실패했습니다.',
        description: '초기데이터 생성 실패',
        variant: 'destructive',
      });
    }

    // 2. 토스페이먼츠 위젯 requestPayment 실행
    try {
      const payment = await tossPayments.requestPayment({
        orderId,
        orderName: itemName,
        successUrl: `${PROJECT_URL}${API_PATH.PAYMENTS.SUCCESS}`,
        failUrl: `${PROJECT_URL}${API_PATH.PAYMENTS.FAIL}`,
        customerEmail: userEmail,
        customerName: userId,
        customerMobilePhone: null,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: '결제에 실패했습니다',
        description: '결제 실패!',
        variant: 'destructive',
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
