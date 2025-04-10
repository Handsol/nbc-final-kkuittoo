'use client';

import { PATH } from '@/constants/path.constants';
import { signOut } from 'next-auth/react';
import ActionButton from '../common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';

const LogoutButton = () => {
  return (
    <ActionButton
      mode={ACTIONBUTTON_MODE.PRIMARY}
      onClick={() => signOut({ callbackUrl: PATH.HOME })}
    >
      로그아웃
    </ActionButton>
  );
};

export default LogoutButton;
