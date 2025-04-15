import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { PiPlant } from 'react-icons/pi';
import { HomeTitleLg, HomeTitleSm } from '../../HomePageItems';
import { RiGamepadLine } from 'react-icons/ri';
import { LuHandshake } from 'react-icons/lu';

// 1페이지 서비스 관련 설명 1
export const ServiceInfo1 = () => {
  return (
    <section className="max-w-md">
      <header className="flex items-center justify-center gap-3 mb-2">
        <PiPlant className="w-[24px] h-[24px] text-white" />
        <HomeTitleLg>작심삼일을 넘어 지속 가능한 성장</HomeTitleLg>
      </header>
      <HomeTitleSm>
        계획만 세우다 끝나버린 하루, 이제 그만하세요. <br />
        매일의 습관을 기록하며 더 나은 자신을 만들어갑니다. <br />
        작은 실천이 큰 변화를 만듭니다.
      </HomeTitleSm>
    </section>
  );
};

// 1페이지 서비스 관련 설명 2
export const ServiceInfo2 = () => {
  return (
    <section className="max-w-md">
      <header className="flex items-center justify-center gap-3 mb-2">
        <RiGamepadLine className="w-[24px] h-[24px] text-white" />
        <HomeTitleLg>게임처럼 즐기는 습관 관리</HomeTitleLg>
      </header>
      <HomeTitleSm>
        포인트를 모아 캐릭터를 성장시키고, <br />
        팀원들과 함께 몬스터를 처치해보세요. <br />
        눈에 보이는 성장이 동기 부여가 됩니다.
      </HomeTitleSm>
    </section>
  );
};

// 1페이지 서비스 관련 설명 3
export const ServiceInfo3 = () => {
  return (
    <section className="max-w-md">
      <header className="flex items-center justify-center gap-3 mb-2">
        <LuHandshake className="w-[24px] h-[24px] text-white" />
        <HomeTitleLg>혼자보단 함께 – 팀 기반 습관 트래커</HomeTitleLg>
      </header>
      <HomeTitleSm>
        혼자선 포기했던 목표도, 함께라면 해낼 수 있습니다. <br />
        팀과 함께 도전하고 서로 응원하며 성장하세요. <br />
        모두의 꾸준함이 모여 하나의 이야기를 만듭니다.
      </HomeTitleSm>
    </section>
  );
};

// 2페이지 캐릭터 성장 관련 이미지
const CHARACTER_IMAGES = [
  '/assets/images/user_lv1.png',
  '/assets/images/user_lv2.png',
  '/assets/images/user_lv3.png',
  '/assets/images/user_lv4.png',
  '/assets/images/user_lv5.png',
];

export const BioPage2Image = () => {
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

// 2페이지 캐릭터 성장 관련 설명
export const BioPage2Info = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 mb-2">
      <HomeTitleLg>나만의 캐릭터를 성장시켜보세요!</HomeTitleLg>
      <HomeTitleSm>
        매일 습관을 달성하면 포인트가 쌓입니다. <br />
        습관 하나당 1포인트, 하루 최대 10포인트까지 얻을 수 있고, <br />
        쌓인 포인트는 곧 캐릭터의 레벨업으로 이어집니다. <br />
        당신이 성장하는 만큼 당신의 캐릭터도 성장할거예요! <br />
        요일별로 나만의 습관을 설정하고, 꾸준히 도전해보세요.
      </HomeTitleSm>
    </div>
  );
};
