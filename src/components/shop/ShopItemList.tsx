import { getUserSession } from '@/lib/services/getUserSession.services';
import UnauthorizedPage from '../loading-error-page/UnauthorizedPage';
import { fetchGetItemList } from '@/lib/services/payment-actions.services';
import NotPurchasedItemList from './NotPurchasedItemList';

const ShopItemList = async () => {
  // 로그인한 유저 정보 가져오기
  const session = await getUserSession();
  if (!session) {
    return <UnauthorizedPage />;
  }
  const userId = session.user.id;
  const userEmail = session.user.email;

  // 아이템 리스트 데이터 가져오기
  const { purchasedItemList, notPurchasedItemList } =
    await fetchGetItemList(userId);

  return (
    <div>
      {/* TODO: 여기 위에 구매한 아이템 목록 렌더링하면 됩니다! */}
      <NotPurchasedItemList
        itemList={notPurchasedItemList}
        userId={userId}
        userEmail={userEmail}
      />
    </div>
  );
};

export default ShopItemList;
