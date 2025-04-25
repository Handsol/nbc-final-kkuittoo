import Sidebar from '@/components/layout/Sidebar';
import SidebarMobileWrapper from '@/components/layout/SidebarMobileWrapper';
import Script from 'next/script';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <>
      {/* 카카오 공유하기 SDK */}
      <Script
        id="kakao-sdk"
        src="https://developers.kakao.com/sdk/js/kakao.js"
        strategy="beforeInteractive"
      />

      <main className="w-full flex flex-col items-center">
        <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center">
          {/* 데스크탑 사이드바 */}
          <div className="hidden md:block">
            <Sidebar />
          </div>
          {/* 모바일용 슬라이드 사이드바 & 헤더 */}
          <SidebarMobileWrapper />
          <article className="w-full">
            {children}
            {modal}
          </article>
        </div>
      </main>
    </>
  );
};

export default Layout;
