import { ShopItem } from '@/types/shop.type';
import Image from 'next/image';
import Title from '../common/Title';
import Text from '../common/Text';
import PurchaseButton from './items/PurchaseButton';
import { TITLE_MODE } from '@/constants/mode.constants';

type NotPurchasedItemCardProps = {
  item: ShopItem;
  userId: string;
  userEmail: string | null | undefined;
};

const NotPurchasedItemCard = ({
  item,
  userId,
  userEmail,
}: NotPurchasedItemCardProps) => {
  const { id, itemName, amount, itemImage } = item;
  const paymentInfo = {
    userId,
    userEmail,
    itemName,
    itemId: id,
    amount,
  };
  return (
    <div className="w-full flex justify-between border border-light-gray rounded-md gap-[16px]">
      <Image
        src={itemImage}
        alt={`${itemName} image`}
        width={150}
        height={150}
        className="bg-light-gray"
      />
      <div className="flex-1 p-[16px] flex flex-col justify-between">
        <div>
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>{itemName}</Title>
          <Text className="text-medium-gray mt-[8px]">{`${amount}원`}</Text>
        </div>
        <div className="flex justify-end">
          <PurchaseButton paymentInfo={paymentInfo} />
        </div>
      </div>
    </div>
  );
};

export default NotPurchasedItemCard;
