'use client';

import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { PATH } from '@/constants/path.constants';

const MobileHeader = ({ onOpen }: { onOpen: () => void }) => {
  const pathname = usePathname();

  const getPageName = () => {
    if (pathname.startsWith(PATH.DASHBOARD)) return 'DASHBOARD';
    if (pathname.startsWith(PATH.TEAM)) return 'MY TEAM';
    if (pathname.startsWith(PATH.RANK.USERS)) return 'RANK';
    return '';
  };

  const currentPage = getPageName();

  return (
    <div className="md:hidden flex flex-col w-full">
      <div className="flex items-center justify-between h-[48px] px-[16px]">
        <button onClick={onOpen} aria-label="Open sidebar">
          <Menu size={32} />
        </button>
        <Image
          src={IMAGE_ASSETS.LOGO.DESKTOP}
          alt="logo"
          width={124}
          height={16}
        />
      </div>
      {currentPage && (
        <div className="w-full py-[22px] px-[16px] text-body-lg font-bold">
          {currentPage}
        </div>
      )}
    </div>
  );
};

export default MobileHeader;
