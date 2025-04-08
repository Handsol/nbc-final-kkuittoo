import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { ReactNode } from 'react';

type UserTitleProps = {
  mode: number;
  children: ReactNode;
};

const UserTitle = ({ mode, children }: UserTitleProps) => {
  switch (mode) {
    case USER_TITLE_MODE.CARD_LEVEL:
      return <h5>{children}</h5>;
    case USER_TITLE_MODE.CARD_NAME:
      return <h5>{children}</h5>;
    case USER_TITLE_MODE.CARD_RANK:
      return <h5>{children}</h5>;
    case USER_TITLE_MODE.CARD_ID:
      return <h6>{children}</h6>;
    default:
      return <span>{children}</span>; // fallback
  }
};

export default UserTitle;
