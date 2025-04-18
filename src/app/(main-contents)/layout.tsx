import Sidebar from '@/components/layout/Sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <main className="w-full flex flex-col items-center">
      {/* 반응형을 위해서 div를 추가 */}
      <div className="max-w-[1024px] flex flex-row justify-center">
        <Sidebar />
        <article className="w-[784px]">
          {children}
          {modal}
        </article>
      </div>
    </main>
  );
};

export default Layout;
