import { PiPlant } from 'react-icons/pi';
import { RiGamepadLine } from 'react-icons/ri';
import { LuHandshake } from 'react-icons/lu';
import { HomeTitleLg, HomeTitleSm } from '../HomePageItems';

const HomeBioPage1 = () => {
  return (
    <article className="flex flex-col items-center justify-center text-center gap-6">
      {/* 작심삼일을 넘어 지속 가능한 성장 */}
      <section className="max-w-md">
        <header className="flex items-center justify-center gap-3 mb-2">
          <PiPlant className="w-[24px] h-[24px] text-white" />
          <HomeTitleLg>작심삼일을 넘어 지속 가능한 성장</HomeTitleLg>
        </header>
        <p>
          <HomeTitleSm>
            계획만 세우다 끝나버린 하루, 이제 그만하세요. <br />
            매일의 습관을 기록하며 더 나은 자신을 만들어갑니다. <br />
            작은 실천이 큰 변화를 만듭니다.
          </HomeTitleSm>
        </p>
      </section>

      <section className="max-w-md">
        <header className="flex items-center justify-center gap-3 mb-2">
          <RiGamepadLine className="w-[24px] h-[24px] text-white" />
          <HomeTitleLg>게임처럼 즐기는 습관 관리</HomeTitleLg>
        </header>
        <p>
          <HomeTitleSm>
            포인트를 모아 캐릭터를 성장시키고, <br />
            팀원들과 함께 몬스터를 처치해보세요. <br />
            눈에 보이는 성장이 동기 부여가 됩니다.
          </HomeTitleSm>
        </p>
      </section>

      <section className="max-w-md">
        <header className="flex items-center justify-center gap-3 mb-2">
          <LuHandshake className="w-[24px] h-[24px] text-white" />
          <HomeTitleLg>혼자보단 함께 – 팀 기반 습관 트래커</HomeTitleLg>
        </header>
        <p>
          <HomeTitleSm>
            혼자선 포기했던 목표도, 함께라면 해낼 수 있습니다. <br />
            팀과 함께 도전하고 서로 응원하며 성장하세요. <br />
            모두의 꾸준함이 모여 하나의 이야기를 만듭니다.
          </HomeTitleSm>
        </p>
      </section>
    </article>
  );
};

export default HomeBioPage1;
