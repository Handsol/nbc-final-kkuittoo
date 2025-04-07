import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main className="p-8 mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
