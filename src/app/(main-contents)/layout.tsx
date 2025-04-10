import MainLayout from '@/components/layout/MainLayout';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <div>
      <main className="w-full">
        <MainLayout>
          {children}
          {modal}
        </MainLayout>
      </main>
    </div>
  );
};

export default Layout;
