'use client';

import LinkButton from '@/components/common/button/LinkButton';
import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { SearchInput } from '../SearchInput';
import Link from 'next/link';
import { getTabButtonClass } from '@/styles/tabButtonStyles';
import { usePathname } from 'next/navigation';
import { PLACEHOLDER } from '@/constants/placeholder.constants';

export const TeamRankHeader = () => {
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
      <div className="hidden md:flex space-x-4 p-12 md:w-full">
        <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.USERS}>
          Character
        </LinkButton>
        <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.TEAMS} disabled>
          Team
        </LinkButton>
      </div>

      {/* 검색창 공통 */}
      <div className="mt-2 p-4 md:mt-0 w-full md:w-1/2">
        <SearchInput placeholder={PLACEHOLDER.TEAM_SEARCH} />
      </div>
    </section>
  );
};
