'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useToast } from '@/hooks/use-toast';

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  // local storage에 로그인 상태 저장
  useEffect(() => {
    if (status === 'authenticated') {
      localStorage.setItem('islogined', 'true');

      // 로그인 성공 시 토스트 메세지 표시
      toast({ description: '로그인 성공' });
    } else if (status === 'unauthenticated') {
      localStorage.removeItem('islogined');
    }
  }, [status]);

  return (
    <div>
      {status === 'loading' ? (
        <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default GoogleLogin;
