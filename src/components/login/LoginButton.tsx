'use client';

import { PATH } from '@/constants/path';
import { signIn } from 'next-auth/react';

const LoginButton = () => {
  return (
    <button
      onClick={() => signIn('google', { callbackUrl: PATH.MYPAGE })}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
    >
      구글 로그인
    </button>
  );
};

export default LoginButton;
