'use client';

import { IMAGE_ASSETS } from '@/constants/assets.contants';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const GlobalLoadingBar = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) return;
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-sub transition-opacity duration-300">
      <Image
        src={IMAGE_ASSETS.LOGO.DESKTOP}
        alt="loading page logo"
        width={300}
        height={200}
        className="animate-bounce mb-5"
      />
      <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-main animate-loading-bar" />
      </div>
    </div>
  );
};

export default GlobalLoadingBar;
