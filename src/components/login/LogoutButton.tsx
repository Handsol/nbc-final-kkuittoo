'use client';

import { PATH } from '@/constants/path.constants';
import { signOut } from 'next-auth/react';
import ActionButton from '../common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('hasVisitedDashboardBefore');
    signOut({ callbackUrl: PATH.HOME });
  };
  return (
    <ActionButton mode={ACTIONBUTTON_MODE.LOGOUT} onClick={handleLogout}>
      Logout
    </ActionButton>
  );
};

export default LogoutButton;
