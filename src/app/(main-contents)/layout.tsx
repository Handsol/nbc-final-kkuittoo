import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main className="w-3/4">{children}</main>
    </div>
  );
};

export default Layout;
