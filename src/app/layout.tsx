import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Provider from '@/lib/providers/Provider';
import GlobalLoadingBar from '@/components/loading-error-page/GlobalLoadingBar';

export const metadata: Metadata = {
  title: 'KKUITTOO',
  description: '의지박약 현대인을 위한 자기계발 도우미',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <GlobalLoadingBar />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
