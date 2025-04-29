'use client';

import { LINKBUTTON_MODE } from '@/constants/mode.constants';
import { PATH } from '@/constants/path.constants';
import LinkButton from '../common/button/LinkButton';
import { useSession } from 'next-auth/react';
import { useMyTeamQuery } from '@/lib/queries/useMyTeamQuery';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const SidebarNav = () => {
  const { data: session } = useSession();
  const userId = session?.user.id || '';
  const { data: team, refetch } = useMyTeamQuery(userId);
  const pathname = usePathname();

  // 경로 변경 시마다 팀 데이터 리페치
  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  const teamHref = team ? `${PATH.TEAM}/${team.teamId}` : PATH.TEAM;

  const NAV_ITEMS = [
    { name: 'Dashboard', href: PATH.DASHBOARD },
    { name: 'My team', href: teamHref },
    { name: 'Rank', href: PATH.RANK.USERS },
    { name: 'Shop', href: PATH.SHOP },
  ];

  return (
    <div className="w-full flex flex-col gap-2 pt-[10px] md:pt-[30px] pl-8">
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
