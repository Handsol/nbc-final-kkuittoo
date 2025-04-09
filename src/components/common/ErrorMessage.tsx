import { ReactNode } from 'react';
import Text from './Text';

type ErrorMessageProps = {
  children: string | ReactNode;
};
const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <Text className="text-red-700">{children}</Text>;
};

export default ErrorMessage;
