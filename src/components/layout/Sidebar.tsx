import LogoutButton from '../login/LogoutButton';
import SidebarProfile from './SidebarProfile';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-[240px] bg-white px-4 py-[40px] flex flex-col shrink-0 drop-shadow-sidebar-purple">
      <div className="flex flex-col items-center">
        <SidebarLogo />
        <SidebarNav />
      </div>

      <div className="flex-1" />

      <div className="flex flex-col gap-3 items-center w-full">
        <SidebarProfile />
        <LogoutButton />
      </div>
    </aside>
  );
};

export default Sidebar;
