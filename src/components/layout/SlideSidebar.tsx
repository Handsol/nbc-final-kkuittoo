'use client';

import { Z_INDEX } from '@/constants/z-index.constants';
import Sidebar from './Sidebar';

const SlideSidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className={`fixed inset-0 z-${Z_INDEX.COMMON} flex overflow-hidden`}>
      <div className="w-[240px] h-full bg-white shadow-lg relative shrink-0">
        <Sidebar isMobile={true} onClose={onClose} />
      </div>
      <div className="flex-1 bg-black/50" onClick={onClose} />
    </div>
  );
};

export default SlideSidebar;
