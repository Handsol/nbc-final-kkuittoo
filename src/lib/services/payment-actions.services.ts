import { SHOP_MESSAGE } from '@/constants/error-messages.constants';
import { prisma } from '@/lib/prisma';

// 구매하지 않은 아이템 리스트 가져오기
export const fetchGetNotPurchasedItemList = async (userId: string) => {
  try {
    const { notPurchasedItemList } = await fetchGetItemList(userId);
    return notPurchasedItemList;
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch not purchased items: ${error}`);
  }
};

export const fetchGetItemList = async (userId: string) => {
  try {
    // 아이템 전체 리스트와 해당 유저가 구매한 아이템 리스트 가져오기
    const itemList = await prisma.item.findMany({
      include: {
        userItems: {
          where: { userId },
        },
      },
    });

    if (!itemList) throw new Error(SHOP_MESSAGE.ITEM.FETCH_FAIL);

    // 구매한 아이템 목록
    const purchasedItemList = itemList.filter(
      (item) => !!item.userItems.length,
    );
    // 구매하지 않은 아이템 목록
    const notPurchasedItemList = itemList.filter(
      (item) => !item.userItems.length,
    );

    return { purchasedItemList, notPurchasedItemList };
  } catch (error) {
    console.error(error);
    throw new Error(`${SHOP_MESSAGE.ITEM.FETCH_FAIL}, itemList`);
  }
};

// 아이템 적용 시 isApplied 상태를 true로 변경
export const fetchPatchApplyItem = async (userItemId: string) => {
  try {
    const res = await fetch(`/api/user-items/${userItemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isApplied: true }),
    });
    if (!res.ok) {
      throw new Error(`Failed to apply item with ID: ${userItemId}`);
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to apply item: ${error}`);
  }
};
