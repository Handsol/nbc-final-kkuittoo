import { ShopItem } from '@/types/shop.type';
import Image from 'next/image';
import Title from '../common/Title';
import Text from '../common/Text';
import { TITLE_MODE } from '@/constants/mode.constants';
import ApplyButton from './items/ApplyButton';
import AppliedButton from './items/AppliedButton';

type PurchasedItemCardProps = {
  item: ShopItem;
  isApplied: boolean;
  onApply: () => void;
};

const PurchasedItemCard = ({
  item,
  isApplied,
  onApply,
}: PurchasedItemCardProps) => {
  const { itemName, amount, itemImage } = item;

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
          {isApplied ? (
            <AppliedButton onClick={onApply} />
          ) : (
            <ApplyButton onClick={onApply} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchasedItemCard;
