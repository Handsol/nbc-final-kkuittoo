import Sidebar from '@/components/layout/Sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <main className="w-full flex flex-col items-center">
      {/* 모바일에서는 전체 너비, 데스크탑에서는 최대 1440px */}
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-center">
        {/* 모바일에서는 사이드바 숨김 */}
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <article className="w-full">
          {children}
          {modal}
        </article>
      </div>
    </main>
  );
};

export default Layout;
