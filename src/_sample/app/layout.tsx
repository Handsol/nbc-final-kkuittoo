import sampleProvider from '../lib/providers/sampleProvider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <sampleProvider>{children}</sampleProvider>
      </body>
    </html>
  );
}
