import CommonInputBar from '@/components/common/CommonInputBar';
import LinkButton from '@/components/common/button/LinkButton';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE, LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import { SearchInput } from '../SearchInput';

export const TeamRankHeader = () => {
  return (
    <section className="flex items-center space-x-2 mb-8">
      <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.USERS}>
        Character
      </LinkButton>
      <LinkButton mode={LINKBUTTON_MODE.RANK} href={PATH.RANK.TEAMS} disabled>
        Team
      </LinkButton>
      <SearchInput placeholder="팀 이름을 검색해보세요." />
    </section>
  );
};
