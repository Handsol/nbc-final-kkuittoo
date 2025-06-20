'use client';

import { IMAGE_ASSETS } from '@/constants/assets.constants';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const GlobalLoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // 대시보드 경로가 아니면 로딩 바를 표시하지 않음
    if (!pathname || !pathname.startsWith(PATH.DASHBOARD)) return;

    // 최초 방문 시에만 로딩 바 표시
    const hasVisitedDashboardBefore = localStorage.getItem(
      'hasVisitedDashboardBefore',
    );
    if (!hasVisitedDashboardBefore) {
      setLoading(true);

      const timer = setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hasVisitedDashboardBefore', 'true');
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-300`}
    >
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="loading page logo"
        width={300}
        height={200}
        className="animate-bounce mb-5"
      />
      <div className="w-40 h-2 bg-light-gray rounded-full overflow-hidden">
        <div className="h-full bg-main animate-loading-bar" />
      </div>
    </div>
  );
};

export default GlobalLoadingBar;
