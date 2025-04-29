import { getUserSession } from '@/lib/services/getUserSession.services';
import UnauthorizedPage from '../loading-error-page/UnauthorizedPage';
import NotPurchasedItemList from './NotPurchasedItemList';
import PurchasedItemList from './PurchasedItemList';

const ShopItemList = async () => {
  // 로그인한 유저 정보 가져오기
  const session = await getUserSession();
  if (!session) {
    return <UnauthorizedPage />;
  }
  const userId = session.user.id;
  const userEmail = session.user.email!;

  return (
    <div className="flex flex-col gap-6">
      <PurchasedItemList userId={userId} />
      <NotPurchasedItemList userId={userId} userEmail={userEmail} />
    </div>
  );
};
export default ShopItemList;
