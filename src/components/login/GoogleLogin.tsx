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
    if (status === 'authenticated' && session?.user?.name) {
      localStorage.setItem('islogined', 'true');

      const { title, description } = LOGIN_TOAST_MESSAGES.SUCCESS(
        session.user.name,
      );
      toast({ title, description });
    } else if (status === 'unauthenticated') {
      localStorage.removeItem('islogined');
    }
  }, [status, session]);

  return (
    <div>
      {status === 'authenticated' ? <ToDashboardButton /> : <LoginButton />}
    </div>
  );
};

export default GoogleLogin;
