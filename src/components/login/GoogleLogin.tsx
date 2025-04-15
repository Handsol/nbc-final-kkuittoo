'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useToast } from '@/lib/hooks/use-toast';
import ToDashboardButton from './ToDashboardButton';

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      toast({
        title: '로그인되었습니다',
        description: `${session.user.name}님 환영합니다!`,
      });
    }
  }, [status]);

  return (
    <div>
      {status === 'authenticated' ? <ToDashboardButton /> : <LoginButton />}
    </div>
  );
};

export default GoogleLogin;
