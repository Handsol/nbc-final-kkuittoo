'use client';

import { X } from 'lucide-react';
import Sidebar from './Sidebar';

const SlideSidebar = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-50 flex overflow-hidden">
      <div className="w-[240px] h-full bg-white shadow-lg relative shrink-0">
        <button
          className="absolute top-4 right-4"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <X size={24} />
        </button>
        <Sidebar />
      </div>
      <div className="flex-1 bg-black/50" onClick={onClose} />
    </div>
  );
};

export default SlideSidebar;
