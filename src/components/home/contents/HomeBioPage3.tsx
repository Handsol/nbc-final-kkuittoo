import Image from 'next/image';
import { BioPage3Info } from './items/BioPageItem';
import { IMAGE_ASSETS } from '@/constants/assets.constants';

const HomeBioPage3 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full mx-auto">
      <Image
        alt="페이지3이미지"
        src={IMAGE_ASSETS.SPRITE.PINK}
        width={280}
        height={160}
        className="rounded-2xl w-full max-w-[280px] h-auto"
      />
      <BioPage3Info />
    </div>
  );
};

export default HomeBioPage3;
