import LogoutButton from '../login/LogoutButton';
import SidebarProfile from './SidebarProfile';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import HowToUseButton from './HowToUseButton';

const Sidebar = () => {
  return (
    <aside className="sticky top-0 h-screen w-[240px] bg-white p-4 flex flex-col gap-4 shrink-0 items-center">
      <SidebarLogo />
      <SidebarNav />
      <HowToUseButton />
      <SidebarProfile />
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
