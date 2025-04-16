'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import LoginButton from './LoginButton';
import { useToast } from '@/lib/hooks/use-toast';
import ToDashboardButton from './ToDashboardButton';
import { LOGIN_TOAST_MESSAGES } from '@/constants/toast-messages.contants';

const GoogleLogin = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  useEffect(() => {
    if (status === 'authenticated') {
      toast({
        title: LOGIN_TOAST_MESSAGES.SUCCESS.TITLE,
        description: LOGIN_TOAST_MESSAGES.SUCCESS.DESCRIPTION,
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
