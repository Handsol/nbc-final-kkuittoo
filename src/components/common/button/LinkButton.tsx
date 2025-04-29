import Link from 'next/link';
import Title from '../Title';
import { LINKBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import clsx from 'clsx';

type LinkButtonProps = {
  href: string;
  mode: string;
  children: string;
  disabled?: boolean;
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
const LinkButton = ({
  href,
  mode,
  children,
  disabled = false,
}: LinkButtonProps) => {
  const isCommon = mode === LINKBUTTON_MODE.COMMON;
  const isNav = mode === LINKBUTTON_MODE.NAV;
  const isRank = mode === LINKBUTTON_MODE.RANK;
  const isShop = mode === LINKBUTTON_MODE.SHOP;

  const linkBtnClass = clsx(
    'flex items-center justify-center px-2 py-2 duration-300',
    isCommon && 'border border-main bg-white text-main rounded-full ',
    isNav &&
      (disabled
        ? 'text-main cursor-not-allowed rounded-full ' //제대로 적용이 된 건지 확인하기 위해 cursor-not-allowed 추가
        : 'text-black rounded-full  hover:text-main'),
    isRank &&
      (disabled
        ? 'border border-main text-heading-lg text-main rounded-full '
        : 'text-heading-lg border border-transparent rounded-full  hover:border hover:border-main hover:text-main'),
    isShop &&
      'bg-light-gray px-[54px] py-[8px] rounded-md hover:bg-medium-gray hover:text-white',
  );

  const linkBtnTextSize = clsx(
    isCommon && 'text-body-sm',
    isNav && 'text-body-xl',
    isRank && 'text-body-lg',
    isShop && 'text-body-xl',
  );

  return (
    <>
      <Link href={href}>
        <button className={linkBtnClass}>
          <Title mode={TITLE_MODE.LINK} className={linkBtnTextSize}>
            {children}
          </Title>
        </button>
      </Link>
    </>
  );
};

export default LinkButton;
