'use client';

import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.contants';
import { Menu } from 'lucide-react';

const MobileHeader = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="md:hidden flex items-center justify-between w-full h-[48px] px-[16px]">
      <button onClick={onOpen} aria-label="Open sidebar">
        <Menu size={32} />
      </button>
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="logo"
        width={152}
        height={36}
      />
    </div>
  );
};

export default MobileHeader;
