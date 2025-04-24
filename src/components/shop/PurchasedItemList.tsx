'use client';

import { useState } from 'react';
import { ItemList } from '@/types/shop.type';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import PurchasedItemCard from './PurchasedItemCard';

type PurchasedItemListProps = {
  itemList: ItemList;
};

const PurchasedItemList = ({ itemList }: PurchasedItemListProps) => {
  const [appliedItemId, setAppliedItemId] = useState<string | null>(null);

  const handleApply = (itemId: string) => {
    // 같은 아이템을 누르면 해제, 다른 아이템을 누르면 새로 적용
    setAppliedItemId((prev) => (prev === itemId ? null : itemId));
  };

  return (
    <article>
      <Title
        mode={TITLE_MODE.SECTION_SUBTITLE}
        className="text-body-md text-medium-gray"
      >
        Purchased Items ({itemList.length})
      </Title>

      <section className="w-full grid grid-cols-1 md:grid-cols-2 mt-[24px] gap-[24px]">
        {itemList.map((item) => (
          <PurchasedItemCard
            key={item.id}
            item={item}
            isApplied={item.id === appliedItemId}
            onApply={() => handleApply(item.id)}
          />
        ))}
      </section>
    </article>
  );
};

export default PurchasedItemList;
