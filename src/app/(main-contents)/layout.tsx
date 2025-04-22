import Sidebar from '@/components/layout/Sidebar';
import SidebarClientWrapper from '@/components/layout/SidebarClientWrapper';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <main className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center">
        {/* 데스크탑 사이드바 */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* 모바일 전용 슬라이드 사이드바 & 헤더 */}
        <SidebarClientWrapper />

        <article className="w-full">
          {children}
          {modal}
        </article>
      </div>
    </main>
  );
};

export default Layout;
