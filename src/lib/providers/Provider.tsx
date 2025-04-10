import { ReactNode } from 'react';
import AuthProvider from './authProvider';
import TQProviders from './TQProvider';

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <TQProviders>{children}</TQProviders>
      </AuthProvider>
    </>
  );
};

export default Provider;
