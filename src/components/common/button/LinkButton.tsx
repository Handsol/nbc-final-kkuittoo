import Link from 'next/link';
import Title from '../Title';
import { TITLE_MODE } from '@/constants/mode.constants';

type LinkButtonProps = {
  href: string;
  mode: string;
  children: string;
};

/**
 * LinkButton : 링크 이동을 위한 버튼
 *
 * 1. mode
 * LINKBUTTON_MODE.NAV => 네비바에 있는 LinkButton
 * LINKBUTTON_MODE.COMMON => 콘텐츠 안에 있는 LinkButton
 * ⚠️ LINKBUTTON_MODE 상수 사용해주세요
 *
 * 2. href
 * Link로 이동하는 경로
 * ⚠️ PATH 상수 사용해주세요
 *
 * 3. children
 * 버튼 안에 들어가는 텍스트
 *
 * @param mode {string}
 * @param href {string}
 * @param children {string}
 * @returns
 *
 * @example
 * <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH}> 내 팀으로 이동하기 </Link>
 */
const LinkButton = ({ href, mode, children }: LinkButtonProps) => {
  return (
    <>
      {mode === 'nav' ? (
        // nav 모드
        <Link href={href}>
          <button className="px-5 py-2 duration-200 hover:bg-slate-500">
            <Title mode={TITLE_MODE.LINK}>{children}</Title>
          </button>
        </Link>
      ) : (
        // common 모드
        <Link href={href}>
          <button className="px-5 py-2 bg-white rounded-full">
            <Title mode={TITLE_MODE.LINK}>{children}</Title>
          </button>
        </Link>
      )}
    </>
  );
};

export default LinkButton;
