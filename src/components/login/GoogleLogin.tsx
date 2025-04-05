'use client';

import { PATH } from '@/constants/path';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import LogoutButton from './LogoutButton';
import LoginButton from './LoginButton';

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  // local storage에 로그인 상태 저장
  useEffect(() => {
    if (status === 'authenticated') {
      localStorage.setItem('islogined', 'true');
    } else if (status === 'unauthenticated') {
      localStorage.removeItem('islogined');
    }
  }, [status]);

  return (
    <div>
      {isLoading ? (
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
      ) : session ? (
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || '프로필 이미지'}
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                {session.user.name?.charAt(0) || 'U'}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700">
              {session.user.name}
            </span>
          </div>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default GoogleLogin;
