'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavButtonProps {
  href: string;
  label: string;
}

const NavButton = ({ href, label }: NavButtonProps): JSX.Element => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-[102px] px-4 py-2 rounded-2xl text-sm font-bold transition-colors ${
        isActive ? 'bg-gray-300 text-black' : 'text-black hover:bg-gray-100'
      }`}
    >
      {label}
    </Link>
  );
};

export default NavButton;
