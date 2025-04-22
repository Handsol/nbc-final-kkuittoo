import Image from 'next/image';
import LinkButton from '../common/button/LinkButton';
import { PATH } from '@/constants/path.constants';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import Text from '../common/Text';
import Title from '../common/Title';
import { IMAGE_ASSETS } from '@/constants/assets.contants';

const NoTeam = () => {
  return (
    <section className="relative w-full p-6 flex flex-col md:flex-row items-center md:items-start gap-6 bg-sub-light mb-10">
      {/* 기본 이미지 */}
      <Image
        src={IMAGE_ASSETS.SPRITE.BLUE}
        alt="Guild Image"
        width={200}
        height={100}
        className="rounded-lg hidden md:block"
      />
      {/* 메인 영역 */}
      <article className="flex flex-col items-center md:items-start justify-center gap-3 text-left">
        {/* 제목 */}
        <Title mode={TITLE_MODE.SECTION_TITLE}>FIND OR MAKE MY TEAM</Title>
        {/* 팀을 찾거나 팀을 생성하는 영역 */}
        <div className="w-full flex flex-col justify-between text-sm gap-4">
          <Text>
            <span className="font-bold">
              새로운 팀을 찾거나 직접 팀을 만들어 보세요!
            </span>
            <br />
            혼자서는 작지만, 함께라면 거대한 몬스터도 거뜬해요. 지금 바로 팀에
            합류해 몬스터를 격파하는 짜릿한 협동전의 주인공이 되어보세요!
          </Text>
          {/* 버튼 wrapper */}
          <div className="flex flex-row gap-4 w-full mt-2 items-center justify-center md:items-start md:justify-normal">
            <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.RANK.TEAMS}>
              Find New Team
            </LinkButton>
            <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.MAEK_TEAM}>
              Make New Team
            </LinkButton>
          </div>
        </div>
      </article>
    </section>
  );
};

export default NoTeam;
