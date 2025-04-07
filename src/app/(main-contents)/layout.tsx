import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

const Layout = ({ children, modal }: LayoutProps) => {
  return (
    <div>
      <main className="w-full">
        {children}
        {modal}
      </main>
    </div>
  );
};

export default Layout;
