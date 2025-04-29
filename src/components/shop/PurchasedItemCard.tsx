'use client';

import Image from 'next/image';
import Title from '../common/Title';
import Text from '../common/Text';
import { TITLE_MODE } from '@/constants/mode.constants';
import { ShopItem } from '@/types/shop.type';
import ApplyButtonWrapper from './items/ApplyButtonWrapper';
import {
  shopItemCardLiStyle,
  shopItemCardImgStyle,
  shopItemCardTextSectionStyle,
  shopItemCardPriceTextStyle,
  shopItemCardPurchaseBtnStyle,
} from '@/styles/shopItemListStyles';

type Props = {
  item: ShopItem;
  isApplied: boolean;
  onClick: () => void;
};

const PurchasedItemCard = ({ item, isApplied, onClick }: Props) => {
  const { itemName, amount, itemImage } = item;

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
          <ApplyButtonWrapper isApplied={isApplied} onClick={onClick} />
        </div>
      </div>
    </li>
  );
};

export default PurchasedItemCard;
