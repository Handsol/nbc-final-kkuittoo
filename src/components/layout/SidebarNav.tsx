'use client';

import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import LinkButton from '../common/button/LinkButton';
import { useSession } from 'next-auth/react';
import { useMyTeamQuery } from '@/lib/queries/useMyTeamQuery';
import { usePathname } from 'next/navigation';

const SidebarNav = () => {
  const { data: session } = useSession();
  const userId = session?.user.id || '';
  const { data: team } = useMyTeamQuery(userId);
  const pathname = usePathname();

  const teamHref = team ? `${PATH.TEAM}/${team.teamId}` : PATH.TEAM;

  const NAV_ITEMS = [
    { name: 'DASHBOARD', href: PATH.DASHBOARD },
    { name: 'MY TEAM', href: teamHref },
    { name: 'RANK', href: PATH.RANK.USERS },
  ];

  return (
    <div className="w-full flex flex-col gap-4 pt-[10px] md:pt-[30px] pl-8">
      {NAV_ITEMS.map((item) => (
        <LinkButton
          key={item.name}
          mode={LINKBUTTON_MODE.NAV}
          href={item.href}
          disabled={pathname === item.href} //현재 경로와 href가 같으면
        >
          {item.name}
        </LinkButton>
      ))}
    </div>
  );
};

export default SidebarNav;
