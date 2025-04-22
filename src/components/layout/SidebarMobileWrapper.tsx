'use client';

import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import SlideSidebar from './SlideSidebar';

const SidebarMobileWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 창 크기 변경(resize)을 감지해서 768px보다 크면 사이드바 저절 닫힘
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize); // 사용자가 창 크기를 조정할 때마다 handleResize가 실행
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <MobileHeader onOpen={() => setIsOpen(true)} />
      {isOpen && <SlideSidebar onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default SidebarMobileWrapper;
