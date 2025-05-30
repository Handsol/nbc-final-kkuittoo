import LogoutButton from '../login/LogoutButton';
import SidebarProfile from './SidebarProfile';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import { ChevronLeft } from 'lucide-react';
import HowToUse from './profile/HowToUse';

const Sidebar = ({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) => {
  return (
    <aside className="sticky top-0 h-screen w-[240px] bg-white px-4 py-[24px] flex flex-col shrink-0 md:shadow-sidebar-purple-right">
      <div className="flex flex-col items-center">
        {/* 모바일: 닫기 버튼, 데스크탑: 로고 */}
        {isMobile ? (
          <button
            className="self-start text-medium-gray hover:text-main"
            onClick={onClose}
            aria-label="사이드바 닫기"
          >
            <ChevronLeft size={32} />
          </button>
        ) : (
          <SidebarLogo />
        )}

        <SidebarNav />
      </div>

      <div className="flex flex-col pt-4 gap-2 items-center w-full">
        <SidebarProfile />
        <LogoutButton />
      </div>
      <div className="flex flex-col pt-6 md:pt-6 gap-2 items-center">
        <HowToUse />
      </div>
    </aside>
  );
};

export default Sidebar;
