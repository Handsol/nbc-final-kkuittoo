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
    // z-[9999]로 한 이유 : 상수처리한 동적변수는 Tailwind가 빌드 시점에 값을 알 수 없기 때문에 안되고
    // 만약 쓸려면 인라인 스타일로 써야 한다고 합니다.
    // 일단 저희 로그인하고 로딩화면 뜰 때 너무 이상하기 때문에 이부분 나중에 해결하는 게 좋을 거 같습니다.
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
