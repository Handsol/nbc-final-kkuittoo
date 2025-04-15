import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

// 2페이지 캐릭터 성장 관련 이미지
const CHARACTER_IMAGES = [
  '/assets/images/user_lv1.png',
  '/assets/images/user_lv2.png',
  '/assets/images/user_lv3.png',
  '/assets/images/user_lv4.png',
  '/assets/images/user_lv5.png',
];

const BioPage2Item = () => {
  return (
    <div className="flex flex-row justify-center items-center h-[200px]">
      {CHARACTER_IMAGES.map((src, idx) => (
        <div key={idx} className="flex items-center">
          <Image alt={`캐릭터${idx + 1}`} src={src} width={100} height={100} />
          {idx < CHARACTER_IMAGES.length - 1 && (
            <FaArrowRight className="text-white" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BioPage2Item;
