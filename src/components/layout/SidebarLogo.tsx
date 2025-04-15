import Image from 'next/image';

const SidebarLogo = () => {
  return (
    <Image
      src="/assets/images/logo_desktop_kkuitddo.png"
      alt="logo"
      width={153}
      height={20}
      className="mt-[60px]"
    />
  );
};

export default SidebarLogo;
