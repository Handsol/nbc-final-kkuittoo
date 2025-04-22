'use client';

import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import SlideSidebar from './SlideSidebar';

const SidebarClientWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <MobileHeader onOpen={() => setIsOpen(true)} />
      {isOpen && <SlideSidebar onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default SidebarClientWrapper;
