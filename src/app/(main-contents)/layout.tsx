import Sidebar from '@/components/layout/Sidebar';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <main className="w-full flex flex-row">
      <Sidebar />
      <div className="ml-[200px]">
        {children}
        {modal}
      </div>
    </main>
  );
};

export default Layout;
