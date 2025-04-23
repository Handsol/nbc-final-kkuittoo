'use client';

import LinkButton from '@/components/common/button/LinkButton';
import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { SearchInput } from '../SearchInput';
import Link from 'next/link';
import { getTabButtonClass } from '@/styles/tabButtonStyles';
import { usePathname } from 'next/navigation';

export const UserRankHeader = () => {
  const pathname = usePathname();
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-2 md:gap-0">
      {/* 모바일 탭 버튼*/}
      <div className="flex w-full md:hidden">
        <Link href={PATH.RANK.USERS} className="w-full">
          <button className={getTabButtonClass(pathname === PATH.RANK.USERS)}>
            Character
          </button>
        </Link>
        <Link href={PATH.RANK.TEAMS} className="w-full">
          <button className={getTabButtonClass(pathname === PATH.RANK.TEAMS)}>
            Team
          </button>
        </Link>
      </div>

      {/* PC용 LinkButton */}
      <div className="hidden md:flex space-x-2 p-4">
        <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.USERS} disabled>
          Character
        </LinkButton>
        <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.TEAMS}>
          Team
        </LinkButton>
      </div>

      {/* 검색창 공통 */}
      <div className="mt-2 md:mt-0 w-full md:w-auto">
        <SearchInput placeholder="캐릭터 이름을 검색해보세요." />
      </div>
    </section>
  );
};
