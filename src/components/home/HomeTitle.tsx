import { ReactNode } from 'react';

type TextProps = {
  children: string | ReactNode;
};

export const HomeTitleLg = ({ children }: TextProps) => {
  return (
    <p className="font-dohyeon text-xl text-white text-center pt-1">
      {children}
    </p>
  );
};

export const HomeTitleSm = ({ children }: TextProps) => {
  return (
    <p className="font-pretendard text-md text-light-gray text-center">
      {children}
    </p>
  );
};
