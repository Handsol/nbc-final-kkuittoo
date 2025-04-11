import CommonInputBar from '@/components/common/CommonInputBar';
import LinkButton from '@/components/common/button/LinkButton';
import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE, LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';

export const TeamRankHeader = () => {
  return (
    <section className="flex items-center space-x-2 mb-8">
      <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.RANK.USERS}>
        Character
      </LinkButton>
      <ActionButton mode={ACTIONBUTTON_MODE.SECONDARY} disabled>
        Team
      </ActionButton>
      <CommonInputBar id="teamSearch" placeholder="팀 이름을 검색해보세요." />
    </section>
  );
};
