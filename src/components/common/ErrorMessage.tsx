import { ReactNode } from 'react';
import Text from './Text';

type ErrorMessageProps = {
  children: string | ReactNode;
};
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Text className="flex h-5 items-center font-pretendard font-thin text-sm text-main">
      {children}
    </Text>
  );
};

export default ErrorMessage;
