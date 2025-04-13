import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import LinkButton from '../common/button/LinkButton';
import { getServerSession } from 'next-auth';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import { authOptions } from '@/lib/utils/auth';

const SidebarNav = async () => {
  const session = await getServerSession(authOptions);
  const team = session ? await fetchGetMyTeamData(session.user.id) : null;

  const teamHref = team ? `${PATH.TEAM}/${team.teamId}` : PATH.TEAM;

  const NAV_ITEMS = [
    { name: 'DASHBOARD', href: PATH.MYPAGE },
    { name: 'MY TEAM', href: teamHref },
    { name: 'RANK', href: PATH.RANK.USERS },
  ];

  return (
    <div className="w-full flex flex-col gap-2">
      {NAV_ITEMS.map((item) => (
        <LinkButton key={item.name} mode={LINKBUTTON_MODE.NAV} href={item.href}>
          {item.name}
        </LinkButton>
      ))}
    </div>
  );
};

export default SidebarNav;
