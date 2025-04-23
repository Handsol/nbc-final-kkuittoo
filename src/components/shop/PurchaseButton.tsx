'use client';

import { useState } from 'react';
import TossPaymentModal from './TossPaymentModal';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import ActionButton from '../common/button/ActionButton';

type purchaseButtonProps = {
  paymentInfo: {
    userId: string;
    userEmail: string | null | undefined;
    itemId: string;
    itemName: string;
    amount: number;
  };
};

const PurchaseButton = ({ paymentInfo }: purchaseButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <ActionButton
        mode={ACTIONBUTTON_MODE.DARK_GRAY_SMALL}
        onClick={() => setIsModalOpen(true)}
      >
        BUY
      </ActionButton>

      <TossPaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        paymentInfo={paymentInfo}
      />
    </>
  );
};

export default PurchaseButton;
