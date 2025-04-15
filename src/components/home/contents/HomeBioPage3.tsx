import Image from 'next/image';
import { BioPage3Info } from './items/BioPageItem';

const HomeBioPage3 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        alt="페이지3이미지"
        src={'/assets/images/pink.png'}
        width={350}
        height={200}
        className="rounded-2xl"
      />
      <BioPage3Info />
    </div>
  );
};

export default HomeBioPage3;
