import { TITLE_MODE } from '@/constants/mode.constants';
import { ReactNode } from 'react';

type TitleProps = {
  mode: string;
  children: string | ReactNode;
};

/**
 * Title : 타이틀을 위한 텍스트 컴포넌트
 * ⚠️ import시 경로 주의해주세요!
 *
 * 1. mode
 * TITLE_MODE.LOGO => 로고. 해당 태그 안에 Image 태그 사용하기
 * TITLE_MODE.LINK => 링크
 * TITLE_MODE.SECTION_TITLE => section의 타이틀 (e.g. HABITS, CALANDAR ...)
 * TITLE_MODE.SECTION_SUBTITLE => section의 부제목 (e.g. TEAM NAME, TEAM BIO ...)
 * ⚠️ TITLE_MODE 상수 사용해주세요
 *
 * 3. children
 * 텍스트
 *
 * @param mode {string}
 * @param children {string | ReactNode}
 * @returns
 *
 * @example
 * <Title mode={TITLE_MODE.LOGO}>
 *    <Image src="/images/logo.png" ... />
 * </Title>
 *
 * <Title mode={TITLE_MODE.SECTION_TITLE}>
 *    HABITS
 * </Title>
 */
const Title = ({ mode, children }: TitleProps) => {
  switch (mode) {
    case TITLE_MODE.LOGO:
      return <h1>{children}</h1>;
    case TITLE_MODE.LINK:
      return <h2 className="font-dohyeon text-lg">{children}</h2>;
    case TITLE_MODE.SECTION_TITLE:
      return <h3 className="font-dohyeon text-2xl text-black">{children}</h3>;
    case TITLE_MODE.SECTION_SUBTITLE:
      return <h4 className="font-dohyeon text-lg text-black">{children}</h4>;
    default:
      return <span className="font-pretendard text-black">{children}</span>;
  }
};

export default Title;
