import type { Metadata } from 'next';
import localFont from 'next/font/local';
import TQProviders from '@/lib/providers/TQProvider';
import './globals.css';
import AuthProvider from '@/lib/providers/authProvider';
import { Toaster } from '@/components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TQProviders>
            {children}
            <Toaster />
          </TQProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
