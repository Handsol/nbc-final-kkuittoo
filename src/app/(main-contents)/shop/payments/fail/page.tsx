import UnauthorizedPage from '@/components/loading-error-page/UnauthorizedPage';
import PurchaseButton from '@/components/shop/PurchaseButton';
import { getUserSession } from '@/lib/services/getUserSession.services';

const PaymentFailPage = async () => {
  const session = await getUserSession();
  if (!session) return <UnauthorizedPage />;

  const paymentInfo = {
    userId: session.user.id,
    userEmail: session.user.email,
    itemId: '12345',
    itemName: '테스트아이템',
    amount: 5000,
  };

  return (
    <div>
      <PurchaseButton paymentInfo={paymentInfo} />
    </div>
  );
};

export default PaymentFailPage;
