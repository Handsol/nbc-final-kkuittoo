import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import ShopItemList from '@/components/shop/ShopItemList';
import { TITLE_MODE } from '@/constants/mode.constants';

const ShopPage = () => {
  return (
    <div className="p-[16px] md:p-[40px]">
      <Title mode={TITLE_MODE.SECTION_TITLE}>상점</Title>
      <Text className="text-medium-gray mt-[16px]">
        작은 배경 하나로 프로필이 특별해져요. 원하는 스타일로 나만의 프로필을
        완성해보세요.
      </Text>
      <div className="mt-[56px]">
        <ShopItemList />
      </div>
    </div>
  );
};

export default ShopPage;
