import LinkButton from '@/components/common/button/LinkButton';
import MobileTabButton from '@/components/common/button/MobileTabButton';
import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { SearchInput } from '../SearchInput';

export const TeamRankHeader = () => {
  return (
    <section className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 mt-[54px] gap-2 md:gap-0">
      {/* 모바일 탭 버튼*/}
      <div className="flex w-full md:hidden border-b border-light-gray">
        <MobileTabButton href={PATH.RANK.USERS} label="Character" />
        <MobileTabButton href={PATH.RANK.TEAMS} label="Team" />
      </div>

      {/* PC용 LinkButton */}
      <div className="hidden md:flex space-x-2">
        <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.USERS}>
          Character
        </LinkButton>
        <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.TEAMS} disabled>
          Team
        </LinkButton>
      </div>

      {/* 검색창 공통 */}
      <div className="mt-2 md:mt-0 w-full md:w-auto">
        <SearchInput placeholder="팀 이름을 검색해보세요." />
      </div>
    </section>
  );
};
