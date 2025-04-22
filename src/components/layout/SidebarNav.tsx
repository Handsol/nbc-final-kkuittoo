'use client';

import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import LinkButton from '../common/button/LinkButton';
import { useSession } from 'next-auth/react';
import { useMyTeamQuery } from '@/lib/queries/useMyTeamQuery';

const SidebarNav = () => {
  const { data: session } = useSession();
  const userId = session?.user.id || '';
  const { data: team } = useMyTeamQuery(userId);

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
