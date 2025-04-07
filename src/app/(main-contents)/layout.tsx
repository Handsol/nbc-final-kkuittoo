import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main className="mx-auto">{children}</main>
    </div>
  );
};

export default Layout;
