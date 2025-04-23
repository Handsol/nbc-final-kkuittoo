import { ItemList } from '@/types/shop.type';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import Image from 'next/image';
import Text from '../common/Text';
import PurchaseButton from './PurchaseButton';
import NotPurchasedItemCard from './NotPurchasedItemCard';

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
      <section className="w-full grid grid-cols-1 md:grid-cols-2 mt-[24px] gap-[24px]">
        {itemList.map((item) => (
          <NotPurchasedItemCard
            item={item}
            userId={userId}
            userEmail={userEmail}
          />
        ))}
      </section>
    </article>
  );
};

export default NotPurchasedItemList;
