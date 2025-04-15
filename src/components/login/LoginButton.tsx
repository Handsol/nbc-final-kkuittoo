'use client';

import { PATH } from '@/constants/path.constants';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

const LoginButton = () => {
  const handleLogin = () => {
    signIn('google', { callbackUrl: PATH.HOME });
  };

  return (
    <button
      onClick={handleLogin}
      className="flex flex-row justify-center items-center text-center w-[250px] h-[55px] rounded-full bg-white gap-[10px]"
    >
      <FcGoogle className="w-8 h-8" />
      <div className="pt-1">
        <Title mode={TITLE_MODE.SECTION_SUBTITLE}>구글로 시작하기</Title>
      </div>
    </button>
  );
};

export default LoginButton;
