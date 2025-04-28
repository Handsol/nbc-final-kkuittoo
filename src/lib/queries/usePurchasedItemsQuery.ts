import { useQuery } from '@tanstack/react-query';
import { fetchGetPurchasedItemList } from '../services/payment-actions.services';

export const usePurchasedItemsQuery = () => {
  return useQuery({
    queryKey: ['userPurchasedItems'],
    queryFn: fetchGetPurchasedItemList,
  });
};
