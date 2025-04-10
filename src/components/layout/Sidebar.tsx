import Image from 'next/image';
import LinkButton from '../common/button/LinkButton';
import LogoutButton from '../login/LogoutButton';
import { PATH } from '@/constants/path.constants';
import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { getServerSession } from 'next-auth';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import { authOptions } from '@/lib/utils/auth';

const Sidebar = async () => {
  const session = await getServerSession(authOptions);

  let teamId = '';

  if (session) {
    const myTeam = await fetchGetMyTeamData(session.user.id);
    if (myTeam) {
      teamId = myTeam.teamId;
    }
  }

  return (
    <aside className="fixed top-0 h-screen w-[200px] bg-white p-4 flex flex-col gap-4 shrink-0 items-center">
      <Image
        src="/assets/images/logo_test.png"
        alt="logo"
        width={153}
        height={20}
      />

      <div className="w-full flex flex-col gap-2">
        <LinkButton mode={LINKBUTTON_MODE.NAV} href={PATH.MYPAGE}>
          DASHBOARD
        </LinkButton>
        <LinkButton
          mode={LINKBUTTON_MODE.NAV}
          href={teamId ? `${PATH.TEAM}/${teamId}` : PATH.TEAM}
        >
          MY TEAM
        </LinkButton>
        <LinkButton mode={LINKBUTTON_MODE.NAV} href={PATH.RANK.USERS}>
          RANK
        </LinkButton>
      </div>

      <Image
        src="/assets/images/user_lv1.png"
        alt="user"
        width={150}
        height={150}
      />

      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
