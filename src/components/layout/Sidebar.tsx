import LogoutButton from '../login/LogoutButton';
import SidebarProfile from './SidebarProfile';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import { ChevronLeft } from 'lucide-react';

const Sidebar = ({
  isMobile = false,
  onClose,
}: {
  isMobile?: boolean;
  onClose?: () => void;
}) => {
  return (
    <aside className="sticky top-0 h-screen w-[240px] bg-white px-4 py-[30px] md:py-[40px] flex flex-col shrink-0 md:shadow-sidebar-purple-right">
      <div className="flex flex-col items-center">
        {/* 모바일일 때는 닫기 버튼, 아니면 로고 */}
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

      <div className="flex flex-col pt-10 gap-3 items-center w-full">
        <SidebarProfile />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
