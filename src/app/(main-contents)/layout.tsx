import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main className="w-full">{children}</main>
    </div>
  );
};

export default Layout;
