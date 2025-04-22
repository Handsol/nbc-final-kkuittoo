import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import LinkButton from '../common/button/LinkButton';
import { fetchGetMyTeamData } from '@/lib/services/team-actions.services';
import { getUserSession } from '@/lib/services/getUserSession.services';

const SidebarNav = async () => {
  const session = await getUserSession();
  const team = session ? await fetchGetMyTeamData(session.user.id) : null;

  const teamHref = team ? `${PATH.TEAM}/${team.teamId}` : PATH.TEAM;

  const NAV_ITEMS = [
    { name: 'DASHBOARD', href: PATH.DASHBOARD },
    { name: 'MY TEAM', href: teamHref },
    { name: 'RANK', href: PATH.RANK.USERS },
  ];

  return (
    <div className="w-full flex flex-col gap-8 pt-10 pl-8">
      {NAV_ITEMS.map((item) => (
        <LinkButton key={item.name} mode={LINKBUTTON_MODE.NAV} href={item.href}>
          {item.name}
        </LinkButton>
      ))}
    </div>
  );
};

export default SidebarNav;
