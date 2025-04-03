'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

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
          <button
            onClick={() => signOut()}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn('google')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          구글 로그인
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
