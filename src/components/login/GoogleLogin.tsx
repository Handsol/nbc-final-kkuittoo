'use client';

import { signIn, signOut } from 'next-auth/react';
import React from 'react';

const GoogleLogin = () => {
  const handleLogin = () => {
    signIn('google');
  };
  return (
    <div>
      <button
        onClick={handleLogin}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        구글 로그인
      </button>
      <button
        onClick={() => signOut()}
        className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      >
        로그아웃
      </button>
    </div>
  );
};

export default GoogleLogin;
