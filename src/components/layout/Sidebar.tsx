import LogoutButton from '../login/LogoutButton';
import SidebarProfile from './SidebarProfile';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';

const Sidebar = () => {
  return (
    <aside className="fixed top-0 h-screen w-[200px] bg-white p-4 flex flex-col gap-4 shrink-0 items-center">
      <SidebarLogo />
      <SidebarNav />
      <SidebarProfile />
      <LogoutButton />
    </aside>
  );
};

export default Sidebar;
