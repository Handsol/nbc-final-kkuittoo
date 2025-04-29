import Image from 'next/image';
import Text from '@/components/common/Text';
import { IMAGE_ASSETS } from '@/constants/assets.constants';

const HabitListLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-16">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={IMAGE_ASSETS.LOGO.DESKTOP}
          alt="Loading logo"
          width={120}
          height={90}
          priority
          className="animate-bounce w-auto h-auto"
        />
        <Text className="text-medium-gray">습관 목록을 불러오는 중...</Text>
        <div className="w-40 h-1.5 bg-light-gray rounded-full overflow-hidden">
          <div className="h-full bg-main animate-loading-bar" />
        </div>
      </div>
    </div>
  );
};

export default HabitListLoading;
