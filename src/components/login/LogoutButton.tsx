'use client';

import { PATH } from '@/constants/path.constants';
import { signOut } from 'next-auth/react';
import ActionButton from '../common/button/ActionButton';

const LogoutButton = () => {
  return (
    <ActionButton
      mode="primary"
      onClick={() => signOut({ callbackUrl: PATH.HOME })}
    >
      로그아웃
    </ActionButton>
  );
};

export default LogoutButton;
