'use client';

import { ItemList } from '@/types/shop.type';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import PurchasedItemCard from './PurchasedItemCard';
import { useState } from 'react';

type Props = {
  itemList: ItemList;
};

const PurchasedItemList = ({ itemList }: Props) => {
  const itemNumber = itemList.length;
  const [appliedItemId, setAppliedItemId] = useState<string | null>(null);

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
          <PurchasedItemCard
            key={item.id}
            item={item}
            isApplied={appliedItemId === item.id}
            onClick={() =>
              setAppliedItemId(appliedItemId === item.id ? null : item.id)
            }
          />
        ))}
      </section>
    </article>
  );
};

export default PurchasedItemList;
