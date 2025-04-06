import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex justify-center bg-gray-400">
      <div className="w-full max-w-[1024px] flex flex-row h-screen">
        <Sidebar />
        <main className="w-[740px] h-full py-48px bg-gray-200 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
