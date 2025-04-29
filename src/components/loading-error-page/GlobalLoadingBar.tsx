'use client';

import { IMAGE_ASSETS } from '@/constants/assets.constants';
import { PATH } from '@/constants/path.constants';
import { Z_INDEX } from '@/constants/z-index.constants';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const GlobalLoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // path가 없거나 마이페이지가 아닌 경우 아무것도 return 하지 않음
    if (!pathname || !pathname.startsWith(PATH.DASHBOARD)) return;

    // localStorage에서 마이페이지 방문 여부 확인 => 없으면 로딩 페이지 실행
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
      className={`fixed inset-0 z-[${Z_INDEX.LOADING_BAR}] flex flex-col items-center justify-center bg-white transition-opacity duration-300`}
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
