'use client';

import { PATH } from '@/constants/path.constants';
import { signIn } from 'next-auth/react';
import { FaGoogle } from 'react-icons/fa';
import Title from '../common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

const LoginButton = () => {
  const handleLogin = () => {
    signIn('google', { callbackUrl: PATH.HOME, prompt: 'select_account' });
  };

  // NOTE: 테스트 계정 로그인을 위한 임시 함수
  const handleTestLogin = () => {
    signIn('credentials', {
      email: 'test@test.com',
      password: 'test',
      callbackUrl: PATH.HOME,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleLogin}
        className="flex flex-row justify-center items-center text-center w-[250px] h-[55px] rounded-full bg-main gap-[10px]"
      >
        <FaGoogle className="text-white" />
        <div className="pt-1">
          <Title mode={TITLE_MODE.LINK} className="text-white">
            구글로 시작하기
          </Title>
        </div>
      </button>
      {/* NOTE: 테스트 계정으로 로그인을 위한 임시 버튼 컴포넌트 */}
      <button
        onClick={handleTestLogin}
        className="w-full text-center underline text-main"
      >
        테스트 계정으로 로그인
      </button>
    </div>
  );
};

export default LoginButton;
