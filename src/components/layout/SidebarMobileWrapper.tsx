'use client';

import { useState, useEffect } from 'react';
import MobileHeader from './MobileHeader';
import SlideSidebar from './SlideSidebar';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

const SidebarMobileWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  // 페이지 이동(경로 변경) 시 사이드바를 자동으로 닫힘
  useEffect(() => {
    setIsOpen(false); // 경로가 변경될 때마다 사이드바를 닫음
  }, [pathname]); // pathname이 변경될 때마다 실행

  // 사이드바가 열렸을 때 뒤쪽 콘텐츠의 스크롤을 비활성화
  useEffect(() => {
    if (isOpen) {
      // 사이드바가 열리면 <body>에 overflow: hidden을 추가해 스크롤을 막음
      document.body.style.overflow = 'hidden';
    } else {
      // 사이드바가 닫히면 overflow 스타일을 제거해 스크롤을 복원
      document.body.style.overflow = '';
    }

    // 컴포넌트 언마운트 시 overflow 정리
    // 페이지 이동 등으로 컴포넌트가 제거될 때 스크롤이 비정상적으로 유지되는 것을 방지
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]); // isOpen 상태가 변경될 때마다 실행

  return (
    <>
      {/* 1) 헤더에서 open 버튼 */}
      <MobileHeader onOpen={() => setIsOpen(true)} />

      {/* 2) 오버레이 + 패널 */}
      <div className="fixed inset-0 z-50 flex pointer-events-none md:hidden">
        {/* 오버레이 (클릭 시 닫힘) */}
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
