import { ItemList, ShopItem } from '@/types/shop.type';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import NotPurchasedItemCard from './NotPurchasedItemCard';
import { shopItemListUlStyle } from '@/styles/shopItemListStyles';
import { useQuery } from '@tanstack/react-query';
import { fetchGetNotPurchasedItemList } from '@/lib/services/payment-actions.services';

// props로 받던 itemList는 useQuery를 사용해 가져올거라 제거
type NotPurchasedItemListProps = {
  userId: string;
  userEmail: string | null | undefined;
};

const NotPurchasedItemList = ({
  userId,
  userEmail,
}: NotPurchasedItemListProps) => {
  // tanstack query를 사용해 구매하지 않은 아이템 리스트를 가져오기
  const { data: itemList } = useQuery({
    queryKey: ['notPurchasedItems', userId],
    queryFn: () => fetchGetNotPurchasedItemList(userId) as Promise<ShopItem[]>,
  });

  // 상품을 전체 구매해서 남은 상품이 없을 경우 빈 배열로 표기
  const itemNumber = itemList?.length || 0;

  return (
    <article>
      <Title
        mode={TITLE_MODE.SECTION_SUBTITLE}
        className="text-body-md text-medium-gray"
      >
        {`All Items (${itemNumber})`}
      </Title>
      <ul className={shopItemListUlStyle}>
        {itemList?.map((item: ShopItem) => (
          <NotPurchasedItemCard
            item={item}
            userId={userId}
            userEmail={userEmail}
            key={item.id}
          />
        ))}
      </ul>
    </article>
  );
};

export default NotPurchasedItemList;
