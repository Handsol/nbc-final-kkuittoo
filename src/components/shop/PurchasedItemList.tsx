import { ItemList } from '@/types/shop.type';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import PurchasedItemCard from './PurchasedItemCard';

type Props = {
  itemList: ItemList;
};

const PurchasedItemList = ({ itemList }: Props) => {
  const itemNumber = itemList.length;

  return (
    <article>
      <Title
        mode={TITLE_MODE.SECTION_SUBTITLE}
        className="text-body-md text-medium-gray"
      >
        {`Purchased Items (${itemNumber})`}
      </Title>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 mt-[24px] gap-[24px]">
        {itemList.map((item) => (
          <PurchasedItemCard key={item.id} item={item} />
        ))}
      </section>
    </article>
  );
};

export default PurchasedItemList;
