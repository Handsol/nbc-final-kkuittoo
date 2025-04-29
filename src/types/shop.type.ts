export type ItemData = {
  id: string;
  itemName: string;
  amount: number;
  itemImage: string;
};

export type UserItemData = {
  id: string;
  userId: string;
  itemId: string;
  orderId: string;
  isApplied: boolean;
};

export type ItemList = ({
  userItems: UserItemData[];
} & ItemData)[];

export type ShopItem = {
  userItems: UserItemData[];
} & ItemData;
