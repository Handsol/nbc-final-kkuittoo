import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import LinkButton from '../common/button/LinkButton';
import { getServerSession } from 'next-auth';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import { authOptions } from '@/lib/utils/auth';

const NAV_ITEMS = [
  { name: 'DASHBOARD', href: PATH.MYPAGE },
  { name: 'MY TEAM', href: PATH.TEAM },
  { name: 'RANK', href: PATH.RANK.USERS },
];

const SidebarNav = async () => {
  const session = await getServerSession(authOptions);

  let teamId = '';

  if (session) {
    const myTeam = await fetchGetMyTeamData(session.user.id);
    if (myTeam) {
      teamId = myTeam.teamId;
    }
  }

  return (
    <div className="w-full flex flex-col mt-[70px] gap-4">
      {NAV_ITEMS.map((item) => (
        <LinkButton key={item.name} mode={LINKBUTTON_MODE.NAV} href={item.href}>
          {item.name}
        </LinkButton>
      ))}
    </div>
  );
};

export default SidebarNav;
