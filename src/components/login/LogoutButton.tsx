import { PATH } from '@/constants/path';
import { signOut } from 'next-auth/react';

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: PATH.HOME })}
      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
