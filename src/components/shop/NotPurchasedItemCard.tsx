import { ShopItem } from '@/types/shop.type';
import Image from 'next/image';
import Title from '../common/Title';
import Text from '../common/Text';
import PurchaseButton from './PurchaseButton';
import { TITLE_MODE } from '@/constants/mode.constants';
import {
  shopItemCardImgStyle,
  shopItemCardLiStyle,
  shopItemCardPriceTextStyle,
  shopItemCardPurchaseBtnStyle,
  shopItemCardTextSectionStyle,
} from '@/styles/shopItemListStyles';

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
    <li className={shopItemCardLiStyle}>
      <Image
        src={itemImage}
        alt={`${itemName} image`}
        width={150}
        height={150}
        className={shopItemCardImgStyle}
      />
      <div className={shopItemCardTextSectionStyle}>
        <div>
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>{itemName}</Title>
          <Text className={shopItemCardPriceTextStyle}>{`${amount}원`}</Text>
        </div>
        <div className={shopItemCardPurchaseBtnStyle}>
          <PurchaseButton paymentInfo={paymentInfo} />
        </div>
      </div>
    </li>
  );
};

export default NotPurchasedItemCard;
