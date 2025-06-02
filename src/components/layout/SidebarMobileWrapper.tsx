'use client';

import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import { Z_INDEX } from '@/constants/z-index.constants';
import { MD_BREAKPOINT } from '@/constants/breakpoints.constants';

const SidebarMobileWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 창 너비가 768px 이상일 때 사이드바 자동 닫힘
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= MD_BREAKPOINT) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 경로 변경 시 사이드바 자동 닫힘
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 사이드바 열릴 때 스크롤 비활성화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* 헤더에서 사이드바 열기 */}
      <MobileHeader onOpen={() => setIsOpen(true)} />

      {/* 사이드바 오버레이 및 패널 */}
      <div
        className={`fixed inset-0 z-${Z_INDEX.COMMON} flex pointer-events-none md:hidden`}
      >
        {/* 오버레이 클릭 시 닫힘 */}
        <div
          onClick={() => setIsOpen(false)}
          className={`
            absolute inset-0 bg-black
            transition-opacity duration-300
            ${isOpen ? 'opacity-50 pointer-events-auto' : 'opacity-0'}
          `}
        />

        {/* 사이드바 패널 */}
        <div
          className={`
            relative w-[240px] h-full bg-white
            transform transition-transform duration-300
            ${
              isOpen ? 'translate-x-0 pointer-events-auto' : '-translate-x-full'
            }
          `}
        >
          <Sidebar isMobile={true} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </>
  );
};

export default SidebarMobileWrapper;
