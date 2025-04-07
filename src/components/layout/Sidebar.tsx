'use client';

import Image from 'next/image';

import { PATH } from '@/constants/path';
import NavButton from './NavButton';
import LogoutButton from '../login/LogoutButton';

const Sidebar = () => {
  return (
    <aside className="w-[200px] bg-white p-4 flex flex-col gap-4 shrink-0 items-center">
      <Image src="/logo_test.png" alt="logo" width={153} height={20} />

      <div className="w-full flex flex-col gap-2">
        <NavButton href={PATH.MYPAGE} label="HOME" />
        <NavButton href={PATH.TEAM} label="TEAM" />
        <NavButton href={PATH.RANK.USERS} label="RANK" />
      </div>

      <Image src="/user_lv1.png" alt="user" width={150} height={150} />

      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
