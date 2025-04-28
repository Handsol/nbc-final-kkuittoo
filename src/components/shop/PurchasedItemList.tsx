'use client';

import {
  fetchGetPurchasedItemList,
  fetchPatchApplyItem,
} from '@/lib/services/payment-actions.services';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import PurchasedItemCard from './PurchasedItemCard';
import { QUERY_KEYS } from '@/constants/query-keys.constants';
import { ShopItem } from '@/types/shop.type';

const PurchasedItemList = () => {
  const queryClient = useQueryClient();

  const { data: purchasedItemList } = useQuery<ShopItem[]>({
    queryKey: [QUERY_KEYS.PURCHASED_ITEMS],
    queryFn: fetchGetPurchasedItemList,
  });

  const itemNumber = purchasedItemList?.length || 0;

  const applyItemMutation = useMutation({
    mutationFn: (userItemId: string) => fetchPatchApplyItem(userItemId),
    onSuccess: () => {
      // 성공 시 캐시를 무효화하여 서버 데이터를 다시 불러옴
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PURCHASED_ITEMS,
      });
    },
  });
  const handleApplyItem = (userItemId: string) => {
    applyItemMutation.mutate(userItemId);
  };

  return (
    <article>
      <Title
        mode={TITLE_MODE.SECTION_SUBTITLE}
        className="text-body-md text-medium-gray"
      >
        {`Purchased Items (${itemNumber})`}
      </Title>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 mt-[24px] gap-[24px]">
        {purchasedItemList?.map((item) => (
          <PurchasedItemCard
            key={item.id}
            item={item}
            isApplied={item.userItems[0]?.isApplied}
            onClick={() => handleApplyItem(item.userItems[0]?.id as string)}
          />
        ))}
      </section>
    </article>
  );
};

export default PurchasedItemList;
