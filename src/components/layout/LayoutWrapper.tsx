'use client';

import { usePathname } from 'next/navigation';
import MainLayout from './MainLayout';
import { ReactNode } from 'react';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  if (isHome) {
    // 홈에서는 레이아웃 안보이게
    return <>{children}</>;
  }

  // 그 외에는 MainLayout 나타나도록
  return <MainLayout>{children}</MainLayout>;
}
