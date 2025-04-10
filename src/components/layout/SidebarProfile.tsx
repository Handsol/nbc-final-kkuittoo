import Image from 'next/image';

const SidebarAvatar = () => {
  return (
    <Image
      src="/assets/images/user_lv1.png"
      alt="user"
      width={150}
      height={150}
    />
  );
};

export default SidebarAvatar;
