import Image from 'next/image';
import LinkButton from '../common/button/LinkButton';
import { PATH } from '@/constants/path.constants';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';
import Title from '../common/Title';
import { IMAGE_ASSETS } from '@/constants/assets.contants';

const NoTeam = () => {
  return (
    <section className="relative w-full py-4 px-12 md:py-6 md:pl-12 flex flex-col md:flex-row items-center gap-4 md:gap-12 bg-sub-light">
      {/* 기본 이미지 */}
      <div className="flex-shrink-0">
        <Image
          src={IMAGE_ASSETS.SPRITE.BLUE}
          alt="Guild Image"
          width={120}
          height={60}
          className="rounded-lg w-32 h-auto md:w-40 lg:w-64" // 중간에 LinkButton 레이아웃이 깨지는 현상때문에 lg, md 이미지 사이즈 분리
        />
      </div>
      {/* 메인 영역 */}
      <article className="flex flex-col items-center md:items-start justify-center gap-2 md:gap-3 text-left flex-1">
        {/* 제목 */}
        <div className="hidden md:block md:text-body-md">
          <Title mode={TITLE_MODE.SECTION_TITLE}>FIND OR MAKE MY TEAM</Title>
        </div>

        {/* 팀을 찾거나 팀을 생성하는 영역 */}
        <div className="w-full flex flex-col justify-between text-body-xs md:text-body-sm gap-2 md:gap-4">
          <Text>
            <span className="font-bold">
              새로운 팀을 찾거나 직접 팀을 만들어 보세요!
            </span>
            <br />
            혼자서는 작지만, 함께라면 거대한 몬스터도 거뜬해요. 지금 바로 팀에
            합류해 몬스터를 격파하는 짜릿한 협동전의 주인공이 되어보세요!
          </Text>
          {/* 버튼 wrapper */}
          <div className="flex flex-row flex-wrap gap-2 md:gap-4 w-full mt-1 md:mt-2 items-center justify-center md:items-start md:justify-normal">
            <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.RANK.TEAMS}>
              Find New Team
            </LinkButton>
            <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.MAKE_TEAM}>
              Make New Team
            </LinkButton>
          </div>
        </div>
      </article>
    </section>
  );
};

export default NoTeam;
