import { IMAGE_ASSETS } from '@/constants/assets.contants';
import Image from 'next/image';

const SidebarLogo = () => {
  return (
    <Image src={IMAGE_ASSETS.LOGO.DESKTOP} alt="logo" width={153} height={20} />
  );
};

export default SidebarLogo;
