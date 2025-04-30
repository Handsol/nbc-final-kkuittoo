import { IMAGE_ASSETS } from '@/constants/assets.constants';
import { ServiceInfo1 } from './items/BioPageItem';
import Image from 'next/image';

const HomeBioPage1 = () => {
  return (
    <article className="flex flex-col items-center justify-center text-center gap-4 md:gap-6 w-full">
      <Image
        alt="페이지3이미지"
        src={IMAGE_ASSETS.SPRITE.BLUE}
        width={280}
        height={160}
        className="rounded-2xl w-full max-w-[280px] h-auto"
      />
      <ServiceInfo1 />
    </article>
  );
};

export default HomeBioPage1;
