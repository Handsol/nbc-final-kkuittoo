import { ReactNode } from 'react';
import Text from './Text';

type ErrorMessageProps = {
  children: string | ReactNode;
};
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return (
    <Text className="font-pretendard font-thin text-sm text-sub">
      {children}
    </Text>
  );
};

export default ErrorMessage;
