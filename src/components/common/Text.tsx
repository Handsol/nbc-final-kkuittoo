import clsx from 'clsx';
import { ReactNode } from 'react';

type TextProps = {
  children: ReactNode;
  className?: string;
};

const Text = ({ children, className = '' }: TextProps) => {
  return (
    <p className={clsx('font-pretendard text-sm', className)}>{children}</p>
  );
};

export default Text;
