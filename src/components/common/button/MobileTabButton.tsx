'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '../Title';

type MobileTabButtonProps = {
  /** 탭 클릭 시 이동할 페이지 경로 */
  href: string;
  /** 버튼에 표시할 텍스트 라벨 */
  label: string;
};

/**
 * @component MobileTabButton
 * @description
 * 모바일 환경에서 사용되는 탭 전환용 버튼 컴포넌트입니다.
 * 현재 경로(pathname)와 `href`가 일치할 경우,
 * 해당 버튼은 비활성화되고 강조된 스타일로 표시됩니다.
 *
 * - 선택된 탭은 클릭할 수 없습니다.
 * - 선택되지 않은 탭은 hover 시 서브 컬러 효과를 가집니다.
 *
 * @example
 * ```tsx
 * <MobileTabButton href={PATH.RANK.USERS} label="Character" />
 * <MobileTabButton href={PATH.RANK.TEAMS} label="Team" />
 * ```
 */
const MobileTabButton = ({ href, label }: MobileTabButtonProps) => {
  const pathname = usePathname();
  const disabled = pathname === href;

  const tabClass = clsx(
    'w-full flex-1 pb-[8px] border-b-4 font-dohyeon text-center transition-all duration-200 ease-in-out',
    disabled
      ? 'border-main text-main font-semibold'
      : 'border-light-gray text-dark-gray hover:text-sub hover:border-sub',
  );

  return (
    <Link href={href} aria-disabled={disabled} className="w-full">
      <button className={tabClass} disabled={disabled}>
        <Title mode={TITLE_MODE.LINK} className="text-body-sm w-full">
          {label}
        </Title>
      </button>
    </Link>
  );
};

export default MobileTabButton;
