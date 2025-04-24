import { ItemList } from '@/types/shop.type';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import NotPurchasedItemCard from './NotPurchasedItemCard';
import { shopItemListUlStyle } from '@/styles/shopItemListStyles';

type NotPurchasedItemListProps = {
  itemList: ItemList;
  userId: string;
  userEmail: string | null | undefined;
};

const NotPurchasedItemList = ({
  itemList,
  userId,
  userEmail,
}: NotPurchasedItemListProps) => {
  const itemNumber = itemList.length;

  return (
    <article>
      <Title
        mode={TITLE_MODE.SECTION_SUBTITLE}
        className="text-body-md text-medium-gray"
      >
        {`All Items (${itemNumber})`}
      </Title>
      <ul className={shopItemListUlStyle}>
        {itemList.map((item) => (
          <NotPurchasedItemCard
            item={item}
            userId={userId}
            userEmail={userEmail}
          />
        ))}
      </ul>
    </article>
  );
};

export default NotPurchasedItemList;
