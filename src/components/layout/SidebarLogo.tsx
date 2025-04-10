import Image from 'next/image';

const SidebarLogo = () => {
  return (
    <Image
      src="/assets/images/logo_test.png"
      alt="logo"
      width={153}
      height={20}
      className="mt-[80px]"
    />
  );
};

export default SidebarLogo;
